const w = window;
const b = document.body;
const d = document.documentElement;

function getPoint(e): { x: number, y: number } {
    const scrollX = Math.max(0, w.pageXOffset || d.scrollLeft || b.scrollLeft || 0) - (d.clientLeft || 0);
    const scrollY = Math.max(0, w.pageYOffset || d.scrollTop || b.scrollTop || 0) - (d.clientTop || 0);
    const pointX = e ? (Math.max(0, e.pageX || e.clientX || 0) - scrollX) : 0;
    const pointY = e ? (Math.max(0, e.pageY || e.clientY || 0) - scrollY) : 0;

    return {x: pointX, y: pointY};
}

export class FactoryModel {
    private container: HTMLElement;
    private options: any;
    private clickItem: any;
    private dragItem: any;
    private hovItem: any;
    private sortLists: any;
    private click: any;
    private dragging: any;

    public constructor(container, options?) {
        if (container && container instanceof HTMLElement) {
            this.container = container;
            this.options = options || {};
            /* nothing atm */
            this.clickItem = null;
            this.dragItem = null;
            this.hovItem = null;
            this.sortLists = [];
            this.click = {};
            this.dragging = false;

            this.container.setAttribute("data-is-sortable", String(1));
            this.container.style.position = "static";

            window.addEventListener("mousedown", this._onPress.bind(this), true);
            window.addEventListener("touchstart", this._onPress.bind(this), true);
            window.addEventListener("mouseup", this._onRelease.bind(this), true);
            window.addEventListener("touchend", this._onRelease.bind(this), true);
            window.addEventListener("mousemove", this._onMove.bind(this), true);
            window.addEventListener("touchmove", this._onMove.bind(this), true);
        }
    }

    // serialize order into array list
    private toArray(attr): any[] {
        attr = attr || "id";

        const data = [];
        let uniq = "";

        // @ts-ignore
        for (const item of this.container.children) {
            uniq = item.getAttribute(attr) || "";
            // uniq = uniq.replace(/[^0-9]+/gi, "");
            data.push(uniq);
        }

        return data;
    }

    // serialize order array into a string
    public toString(attr?, delimiter?): string {
        delimiter = delimiter || ":";

        return this.toArray(attr).join(delimiter);
    }

    // checks if mouse x/y is on top of an item
    public _isOnTop(item, x, y): boolean {
        const box = item.getBoundingClientRect();
        const isx = (x > box.left && x < (box.left + box.width));
        const isy = (y > box.top && y < (box.top + box.height));

        return (isx && isy);
    }

    // manipulate the className of an item (for browsers that lack classList support)
    private _itemClass(item, task, cls): void {
        const list = item.className.split(/\s+/);
        const index = list.indexOf(cls);

        if (task === "add" && index === -1) {
            list.push(cls);
            item.className = list.join(" ");
        }
        else if (task === "remove" && index !== -1) {
            list.splice(index, 1);
            item.className = list.join(" ");
        }
    }

    // swap position of two item in sortable list container
    private _swapItems(item1, item2): void {
        const parent1 = item1.parentNode;
        const parent2 = item2.parentNode;

        if (parent1 !== parent2) {
            // move to new list
            parent2.insertBefore(item1, item2);
        }
        else {
            // sort is same list
            const temp = document.createElement("div");
            parent1.insertBefore(temp, item1);
            parent2.insertBefore(item1, item2);
            parent1.insertBefore(item2, temp);
            parent1.removeChild(temp);
        }
    }

    // update item position
    private _moveItem(item, x, y): void {
        item.style["-webkit-transform"] = "translateX( " + x + "px ) translateY( " + y + "px )";
        item.style["-moz-transform"] = "translateX( " + x + "px ) translateY( " + y + "px )";
        item.style["-ms-transform"] = "translateX( " + x + "px ) translateY( " + y + "px )";
        item.style.transform = "translateX( " + x + "px ) translateY( " + y + "px )";
    }

    // make a temp fake item for dragging and add to container
    private _makeDragItem(item): void {
        this._trashDragItem();
        this.sortLists = document.querySelectorAll("[data-is-sortable]");

        this.clickItem = item;
        this._itemClass(this.clickItem, "add", "active");

        this.dragItem = document.createElement(item.tagName);
        this.dragItem.className = "dragging";
        this.dragItem.innerHTML = item.innerHTML;
        this.dragItem.style.position = "absolute";
        this.dragItem.style["z-index"] = "999";
        this.dragItem.style.left = (item.offsetLeft || 0) + "px";
        this.dragItem.style.top = (item.offsetTop || 0) + "px";
        this.dragItem.style.width = (item.offsetWidth || 0) + "px";

        this.container.appendChild(this.dragItem);
    }

    // remove drag item that was added to container
    private _trashDragItem(): void {
        if (this.dragItem && this.clickItem) {
            this._itemClass(this.clickItem, "remove", "active");
            this.clickItem = null;

            this.container.removeChild(this.dragItem);
            this.dragItem = null;
        }
    }

    // on item press/drag
    private _onPress(e): void {
        if (e && e.target && e.target.parentNode === this.container) {
            e.preventDefault();

            this.dragging = true;
            this.click = getPoint(e);
            this._makeDragItem(e.target);
            this._onMove(e);
        }
    }

    // on item release/drop
    private _onRelease(e): void {
        this.dragging = false;
        this._trashDragItem();
    }

    // on item drag/move
    private _onMove(e): void {
        if (this.dragItem && this.dragging) {
            e.preventDefault();

            const point = getPoint(e);
            let container = this.container;

            // drag fake item
            this._moveItem(this.dragItem, (point.x - this.click.x), (point.y - this.click.y));

            // keep an eye for other sortable lists and switch over to it on hover
            for (const subContainer of this.sortLists) {
                if (this._isOnTop(subContainer, point.x, point.y)) {
                    container = subContainer;
                }
            }

            // container is empty, move clicked item over to it on hover
            if (this._isOnTop(container, point.x, point.y) && container.children.length === 0) {
                container.appendChild(this.clickItem);

                return;
            }

            // check if current drag item is over another item and swap places
            // @ts-ignore
            for (const subItem of container.children) {
                if (subItem === this.clickItem || subItem === this.dragItem) {
                    continue;
                }
                if (this._isOnTop(subItem, point.x, point.y)) {
                    this.hovItem = subItem;
                    this._swapItems(this.clickItem, subItem);
                }
            }
        }
    }
}
