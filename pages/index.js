import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import { Card, Button, Menu } from "semantic-ui-react";
import Layout from "../components/Layout";

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    campaigns: campaigns,
  };
};

function CampaignIndex(props) {
  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <h3>Open Campaigns</h3>
        {renderCampaigns()}
        <Button content="Create Campaign" icon="add circle" primary />
      </div>
    </Layout>
  );
}

export default CampaignIndex;
