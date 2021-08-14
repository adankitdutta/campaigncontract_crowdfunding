import React from "react";
import Layout from "../../../components/Layout";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";

function index(props) {
  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
}

index.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};

export default index;
