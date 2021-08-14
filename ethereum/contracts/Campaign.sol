pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    function createCampaign(uint minimum) public
    {
        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[])
    {
        return deployedCampaigns;
    }
}



contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address receipent;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }
    
    address public manager;
    uint256 public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    
    modifier restricted(){
        require(msg.sender == manager, "Only managers allowed!");
        _;
    }
    
    constructor(uint256 minimum,address managerAddress) public{
        manager=managerAddress;
        minimumContribution=minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution,
            "You need more money to enter into the contribution list!");
        require(!approvers[msg.sender], "You can contribute only once!");
        approvers[msg.sender]=true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address receipent) public restricted{
        Request memory newRequest=Request({
            description:description,
            value:value,
            receipent:receipent,
            complete:false,
            approvalCount:0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public{
        Request storage request=requests[index];
        
        require(approvers[msg.sender], "You need to contribute first!");
        require(!request.approvals[msg.sender],"You can't approve a request twice!");

        
        request.approvalCount++;
        request.approvals[msg.sender]=true;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request=requests[index];
        
        require(
            request.approvalCount > approversCount / 2,
            "Insufficient approvals!"
        );
        require(
            !request.complete,
            "This request has already been completed!"
        );
        
        request.receipent.transfer(request.value);
        
        request.complete=true;
    }

    function getSummary() public view returns (uint ,uint, uint, uint, address){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
    
}