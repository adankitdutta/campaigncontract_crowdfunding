import React from "react";
import Layout from "../../components/Layout";

function show(props) {
  return (
    <Layout>
      <h3>hjadh</h3>
    </Layout>
  );
}

show.getInitialProps = async (props) => {
  console.log(props.query.address);
  return {};
};

export default show;
