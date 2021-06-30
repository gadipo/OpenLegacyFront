export class Item {

    constructor(
        public itemNo :number,
        public title : string,
        public amount : number,
        public inventoryCode : string,
        ){}
        
        
        public get _inventoryCode() : string {
            return this.inventoryCode;
         } 
        public set _inventoryCode(inventoryCode : string) {
            this.inventoryCode = inventoryCode;
        }
        
        public get _amount() : number {
            return this.amount;
        }
        public set _amount(amount : number) {
            this.amount = amount;
        }
        
        public get _title() : string {
            return this.title;
        }
        public set _title(title : string) {
            this.title = title;
        }
        
        public get _itemNo() :number {
            return this.itemNo;
        }
        public set _itemNo(itemNo :number) {
            this.itemNo = itemNo;
        }
        
}
