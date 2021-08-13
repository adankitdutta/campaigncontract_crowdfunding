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
        <h3>Open Campaigns</h3>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

export default CampaignIndex;
