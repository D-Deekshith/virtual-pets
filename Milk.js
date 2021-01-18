class Milk{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('images/Milk.png')
    }

    getFoodStock(){
        this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    update(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock-1;
        }
    }

    getFeedTime(feedTime){
        this.feedTime = feedTime;
    }

    bedroom(){
        background(bedroomImg);
    }

    garden(){
        background(gardenImg);
    }

    washroom(){
        background(washroomImg);
    }

    display(){
        var x = 80, y = 150;
        imageMode(CENTER);
        image(this.image,260,350,70,70);

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 5 == 0){
                    x = 80;
                    y = y + 50;
                }

                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }
}
