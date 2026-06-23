# OpMon State Panel

OpMon State Panel Plugin for Grafana.

OpMon is a monitoring solution developed by OpServices. Learn more at:

https://www.opservices.com

This panel plugin displays the current monitoring state returned by the OpMon Datasource plugin, allowing Grafana dashboards to visualize host, service, and object status in a simple and intuitive way.

## Requirements

Before building and signing the plugin, ensure you have:

- Grafana 11.x or newer
- Docker
- A Grafana Access Policy Token with plugin signing permissions
- Internet access to download project dependencies during the build process
- The OpMon Datasource plugin installed and configured

> [!NOTE]
> This plugin should be signed before being loaded by Grafana.
>
> If you do not want to sign the plugin, Grafana can be configured to allow unsigned plugins by adding the plugin ID to the `allow_loading_unsigned_plugins` setting in `grafana.ini`.
>
> Example:
>
> ```ini
> [plugins]
> allow_loading_unsigned_plugins = opservicesti-opmon-panel
> ```

## Dependencies

This plugin requires the **OpMon Datasource** plugin:

https://github.com/opservices/opmon-datasource

Make sure the datasource plugin is installed and configured before using the OpMon State Panel.

## Installation

### 1. Configure Environment Variables

```bash
export GRAFANA_ACCESS_POLICY_TOKEN="yourGrafanaAccessPolicyToken"

export ROOT_URLS="https://grafana.example.com"

# Multiple Grafana URLs
export ROOT_URLS="https://grafana.example.com,https://monitor.example.com,https://10.0.0.10"
```

### 2. Create the Builder Dockerfile

Create a file named `Dockerfile`:

```dockerfile
FROM node:22-bookworm

RUN apt-get update && \
    apt-get install -y git zip && \
    corepack enable && \
    corepack prepare yarn@stable --activate && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /work
```

### 3. Build the Docker Image

```bash
docker build -t opmon-plugin-builder .
```

### 4. Build and Sign the Plugin

```bash
docker run --rm \
  -v $(pwd):/work \
  -e GRAFANA_ACCESS_POLICY_TOKEN \
  -e ROOT_URLS \
  opmon-plugin-builder \
  bash -e -c '
    corepack enable >/dev/null 2>&1
    corepack prepare yarn@stable --activate >/dev/null 2>&1

    rm -rf /work/opservicesti-opmon-panel

    cd /tmp

    git clone -q https://github.com/opservices/opmon-state-panel.git >/dev/null

    cd opmon-state-panel

    yarn install --silent >/dev/null
    yarn build >/dev/null

    npx --yes @grafana/sign-plugin@latest \
      --rootUrls "$ROOT_URLS" \
      >/dev/null 2>&1

    cp -a dist /work/opservicesti-opmon-panel

    echo "OK - OpMon State Panel plugin successfully built and signed."
  '
```

### 5. Install the Plugin in Grafana

Copy the generated plugin directory to Grafana's plugins directory:

```bash
cp -r opservicesti-opmon-panel /var/lib/grafana/plugins/
```

Restart Grafana after copying the plugin.

## Panel Configuration

After installing the plugin:

1. Install and configure the **OpMon Datasource** plugin.
2. Create a dashboard panel.
3. Select **OpMon State Panel** as the visualization type.
4. Create a query using the OpMon Datasource that returns the status of a host, service, or monitored object.
5. Configure panel options according to your dashboard requirements.

The panel will display the current state returned by OpMon, allowing quick visualization of monitoring status directly within Grafana dashboards.

## Development

### Clone the Repository

```bash
git clone https://github.com/opservices/opmon-state-panel.git
cd opmon-state-panel
```

### Install Dependencies

```bash
yarn install --pure-lockfile
```

### Build the Plugin

```bash
yarn run build
```

### Run Development Mode

```bash
yarn dev
```

## License

MIT License.
