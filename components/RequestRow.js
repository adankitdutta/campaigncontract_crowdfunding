import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

function RequestRow(props) {
  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const [state, setState] = useState({
    countOfApproval: request.approvalCount,
    finalize: readyToFinalize,
    complete: request.complete,
  });

  const [isApproving, setIsApproving] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const onApprove = async () => {
    setIsApproving(true);
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0],
      });

      //for updating the approvals count and finalize option
      var rq = await campaign.methods.requests(props.id).call();
      var ac = rq.approvalCount;
      setState({
        ...state,
        countOfApproval: ac,
        finalize: ac > approversCount / 2,
      });
    } catch (err) {
      window.alert(err.message);
    }
    setIsApproving(false);
  };

  const onFinalize = async () => {
    setIsFinalizing(true);
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(props.id).send({
        from: accounts[0],
      });

      //for updating the finalize button and row update
      var rq = await campaign.methods.requests(props.id).call();
      var c = rq.complete;
      setState({
        ...state,
        complete: c,
      });
    } catch (err) {
      window.alert(err.message);
    }
    setIsFinalizing(false);
  };

  return (
    <Row disabled={state.complete} positive={state.finalize && !state.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.receipent}</Cell>
      <Cell>
        {state.countOfApproval}/{approversCount}
      </Cell>
      <Cell>
        {state.complete ? null : (
          <Button loading={isApproving} color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {state.complete || !state.finalize ? null : (
          <Button
            loading={isFinalizing}
            color="teal"
            basic
            onClick={onFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}

export default RequestRow;
