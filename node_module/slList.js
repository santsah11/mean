function Node(val) {
    this.val = val;
    this.next = null
}
function sllist() {
    this.head = null

}


sllist.prototype.addback = function (val) {
    var mynode = new Node(val);
    runner = this.head
    if (this.head === null) {
        this.head = mynode
        return this.head;
    } else

        while (runner.next) {
            runner = runner.next
        }
    runner.next = mynode;
    return mynode

}
// mysllist = new sllist();
// console.log(mysllist.addback(45));



module.exports = {
    Node: Node,
    sllist: sllist
};
