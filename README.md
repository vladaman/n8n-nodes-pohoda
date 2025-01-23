# n8n-nodes-pohoda

This is an n8n community node that allows you to integrate **Pohoda by Stormware** into your n8n workflows.

**Pohoda** is a comprehensive accounting software that leverages the **mServer XML API** to enable seamless automation of daily accounting operations. By integrating Pohoda with n8n, you can fully automate your business processes, especially when combined with AI tools.

![workflow.png](docs%2Fimages%2Fworkflow.png)

![screen_node.png](docs%2Fimages%2Fscreen_node.png)

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation to install this node.

## Operations

This node supports the following operations:
- **Create Invoice**: Generate and send invoices directly from Pohoda.
- **Update Customer**: Modify customer details in your Pohoda database.
- **Fetch Orders**: Retrieve order data from Pohoda for further processing.
- **Generate Reports**: Automate the creation of financial reports.

## Credentials

To use this node, you need to authenticate with Pohoda's mServer XML API. Follow these steps:

1. **Prerequisites**: Ensure you have an active Pohoda account and access to the mServer XML API.
2. **Authentication**: Use API keys or OAuth2 for authentication. Provide the necessary credentials in the node configuration.
3. **Setup**: Enter your API endpoint, username, and password (or API key) in the credentials section of the node.

## Compatibility

- **Tested Versions**: 1.71.3

## Usage

This node is designed to simplify the integration of Pohoda with n8n workflows. Here are some tips for getting started:

- **Automate Invoicing**: Use the **Create Invoice** operation to automatically generate invoices based on triggers from other apps.
- **Sync Customer Data**: Keep your customer records up-to-date by syncing data between Pohoda and other CRM systems.
- **Generate Financial Reports**: Schedule automated report generation to streamline your accounting processes.
