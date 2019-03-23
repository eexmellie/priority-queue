const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (this.isEmpty()) return;
		const poppedNode = this.detachRoot();
		this.restoreRootFromLastInsertedNode(poppedNode);
		if (!this.isEmpty()) {
			this.shiftNodeDown(this.root);
		}
		this.heapSize--;
		return poppedNode.data;
	}

	detachRoot() {
		const heapRoot = this.root;
		if (this.parentNodes[0] == heapRoot) {
			this.parentNodes.shift();
		}
		this.root = null;
		return heapRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.isEmpty()) return;
		this.root = this.parentNodes.pop();
		const oldRootParent = this.root.parent;
		if (oldRootParent) {
			oldRootParent.removeChild(this.root);
			if (oldRootParent !== detached
			    && !oldRootParent.right
			    && this.parentNodes.indexOf(oldRootParent) < 0) {

				this.parentNodes.unshift(oldRootParent);
			}
		}
		this.root.parent = null;
		this.root.left = detached.left;
		if (this.root.left) {
			this.root.left.parent = this.root;
		}
		this.root.right = detached.right;
		if (this.root.right) {
			this.root.right.parent = this.root;
		}
		if ((!this.root.left || !this.root.right)) {
			this.parentNodes.unshift(this.root);
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return !this.root && this.parentNodes.length === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) this.parentNodes.shift();
		}
	}

	// _swapNodes(childNode, parentNode) {

	// }

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			const parent = node.parent;
			const nodeIndexInParentNodes = this.parentNodes.indexOf(node);
			const parentIndexInParentNodes = this.parentNodes.indexOf(parent);
			node.swapWithParent();
			if (nodeIndexInParentNodes >= 0) {
				this.parentNodes[nodeIndexInParentNodes] = parent;
			}
			if (parentIndexInParentNodes >= 0) {
				this.parentNodes[parentIndexInParentNodes] = node;
			}
			this.shiftNodeUp(node);
		}
		if (!node.parent) this.root = node;
	}

	shiftNodeDown(node) {
		if (!node.left && !node.right) {
			return;
		}
		let childToSwapWith = null;
		if (!node.right) {
			if (node.left.priority > node.priority) {
				childToSwapWith = node.left;
			}
		} else if (node.priority < Math.max(node.left.priority, node.right.priority)){
			childToSwapWith = node.right.priority > node.left.priority ? node.right : node.left;
		}

		if (!childToSwapWith) {
			return;
		}

		const nodeIndexInParentNodes = this.parentNodes.indexOf(node);
		const childIndexInParentNodes = this.parentNodes.indexOf(childToSwapWith);

		childToSwapWith.swapWithParent();
		if (nodeIndexInParentNodes >= 0) {
			this.parentNodes[nodeIndexInParentNodes] = childToSwapWith;
		}
		if (childIndexInParentNodes >= 0) {
			this.parentNodes[childIndexInParentNodes] = node;
		}

		if (this.root === node) {
			this.root = childToSwapWith;
		}

		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
