# OpMon State Panel

Grafana plugin to show the current state from status result of OpMon Datasource plugin.

OpMon is a monitoring solution. You can downoload it at https://www.opservices.com/download

The connector allows you to use all the monitoring data generated by OpMon on grafana dashboards.

## Installation

Clone the repository inside /var/lib/grafana/plugins

git clone https://github.com/opservices/opmon-state-panel.git

After that, go to opmon-state-panel and run:

yarn install
yarn run build

> Note that the Grafana must be running in development mode, since this is a unassigned plugin.

## Setup

After adding a datasource using OpMon Datasource plugin, configure the query to get status from an object (host, service, etc.) and visualize the result with OpMon State Panel.
