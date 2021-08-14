import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

function RequestNew(props) {
  const [state, setState] = useState({
    description: "",
    value: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    const { description, value, recipient } = state;

    setState((state) => ({ ...state, loading: true, errorMessage: "" }));
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (err) {
      setState((state) => ({ ...state, errorMessage: err.message }));
    }
    setState((state) => ({ ...state, loading: false }));
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={handleSubmit} error={!!state.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            name="description"
            value={state.description}
            onChange={(event) =>
              setState((state) => ({
                ...state,
                description: event.target.value,
              }))
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            name="value"
            value={state.value}
            onChange={(event) =>
              setState((state) => ({ ...state, value: event.target.value }))
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient Address</label>
          <Input
            name="recipient"
            value={state.recipient}
            onChange={(event) =>
              setState((state) => ({ ...state, recipient: event.target.value }))
            }
          />
        </Form.Field>
        <Message error header="Oops" content={state.errorMessage} />
        <Button loading={state.loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;
  return {
    address,
  };
};

export default RequestNew;
