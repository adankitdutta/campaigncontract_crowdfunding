import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

function RequestRow(props) {
  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      window.alert(err.message);
    }
  };

  const onFinalize = async () => {
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.receipent}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
