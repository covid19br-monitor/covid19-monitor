#install.packages('here')
#install.packages("ggplot2")
#install.packages("magrittr")
#install.packages("incidence")
#install.packages("projections")
#install.packages("distcrete")
#install.packages("rjson")

library(here)
library(ggplot2)
library(magrittr)
library(incidence)
library(projections)
library(distcrete)
library(rjson)

simulate_cases <- readRDS(here("rds", "simulate_cases.rds"))

scripts <- list.files("scripts", pattern = "[.]R$", full.names = TRUE)
lapply(scripts, source)

# From https://data.brasil.io/dataset/covid19/_meta/list.html
casos <- read.csv(here("caso.csv"))
states_with_death <- casos[(casos$deaths > 0) & (casos$place_type == "state") & complete.cases(casos$deaths),"state"]
states_with_death <- as.character(unique(states_with_death))
states_with_death <- c(states_with_death, "BR")

estimates <- data.frame("RJ", "2001-01-01", 0, 0, 0, 0, stringsAsFactors=FALSE)
names(estimates) <- c("state", "date", "1%", "5%", "95%", "99%")

for (state in states_with_death) {
  print(paste(c("Simulating ", state)))

  if (state == "BR") {
    deaths_state <- casos[(casos$deaths > 0 & casos$place_type == "state" & complete.cases(casos$deaths)),]
    deaths_state <- aggregate(deaths_state$deaths, by=list(date=deaths_state$date), FUN=sum)
    colnames(deaths_state)[2] <- "deaths"
  } else {
    deaths_state <- casos[(casos$state == state & casos$deaths > 0 & casos$place_type == "state" & complete.cases(casos$deaths)),]
  }
  deaths_state <- deaths_state[order(deaths_state[,1]),]
  
  dates <- c()
  total_deaths <- 0
  for (i in 1:nrow(deaths_state)) {
    deaths_state
    new_deaths <- deaths_state[i, "deaths"] - total_deaths
    total_deaths <- total_deaths + new_deaths
    date_deaths <- rep(paste(deaths_state[i, "date"]), new_deaths)
    dates <- c(dates, date_deaths)
  }
  
  clean_date <- as.Date(unlist(dates))
  clean_date <- clean_date[!is.na(clean_date)]
  clean_date <- clean_date[order(clean_date)]
  date_range <- clean_date[length(clean_date)] - clean_date[1]
  date_death = clean_date
  
  result <- simulate_cases(date_death,
                 R = 2,
                 cfr = 0.02,
                 duration = 1,
                 n_sim = 100)
  
  projections <- result$projections
  projections_df <- as.data.frame(projections)
  
  for (i in 1:nrow(projections_df)) {
    row <- projections_df[i,]
    simulations <- as.numeric(tail(as.list(row), -1))
    quantiles <- quantile(simulations, probs = c(0.01, 0.05, 0.95, 0.99))
    date <- paste(row$dates)
    estimates[nrow(estimates) + 1,] <- c(state, date, quantiles)
  }
}

estimates = estimates[-1,]
estimates

json <- toJSON(unname(split(estimates, 1:nrow(estimates))))
json

write(json, file = "result.json")