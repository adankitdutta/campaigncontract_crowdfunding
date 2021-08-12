pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    constructor(uint minimum) public
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
        require(manager==msg.sender);
        _;
    }
    
    constructor(uint256 minimum,address managerAddress) public{
        manager=managerAddress;
        minimumContribution=minimum;
    }
    
    function contribute() public payable{
        require(msg.value>minimumContribution);
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
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvalCount++;
        request.approvals[msg.sender]=true;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request=requests[index];
        
        require(request.approvalCount>(approversCount/2));
        
        require(!request.complete);
        
        request.receipent.transfer(request.value);
        
        request.complete=true;
    }
    
}