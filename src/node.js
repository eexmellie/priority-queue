class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left) {
			if (this.right) {
				return false;
			}
			this.right = node;
			node.parent = this;
		} else {
			this.left = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw "No such child exists"
		}
	}

	remove() {
		if (!this.parent) {
			return;
		}
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
		const leftChild = this.left;
		const rightChild = this.right;
		const parent = this.parent;
		const grandParent = parent.parent;
		const parentLeftChild = parent.left;
		const parentRightChild = parent.right;

		this.parent = grandParent;
		
		if (parent.left === this) {
			this.left = parent;
			this.right = parentRightChild;
			if (parentRightChild) parentRightChild.parent = this;
		} else {
			this.right = parent;
			this.left = parentLeftChild;
			if (parentLeftChild) parentLeftChild.parent = this;
		}

		parent.parent = this;
		parent.left = leftChild;
		parent.right = rightChild;
		if (leftChild) leftChild.parent = parent;
		if (rightChild) rightChild.parent = parent;

		if (grandParent) {
			if (grandParent.left === parent) {
				grandParent.left = this;
			} else if (grandParent.right === parent) {
				grandParent.right = this;
			}
		}
	}
}

module.exports = Node;
