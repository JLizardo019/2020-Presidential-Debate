let data;
// 0 for chris, 1 for biden, 2 for trump
let person;
let articles = ["a", "is", "of", "in", "to", "an", "the", "and", "on", "it", "that", "at"]; // words not to include
let counter = 0;

let trump =
{   words:{},
    keys: [],
    x: 368,
    y: 20,
    display: function(){
        this.keys.sort(compare);

        function compare(a, b) {
            var countA = trump.words[a];
            var countB = trump.words[b];
            return countA - countB;
        }

        for (let k of this.keys){
            if (this.words[k]>5){
                let size = map(this.words[k],this.words[this.keys[0]],this.words[this.keys[this.keys.length-1]],5,33);
                let color = map(this.words[k],this.words[this.keys[0]],this.words[this.keys[this.keys.length-1]],150,255);
                fill(color);
                textSize(size);
                text(k,this.x,this.y);
                let wordWidth = textWidth(k)+(size*0.40);
                this.x += wordWidth;

                if (this.x + wordWidth+12>width){
                    this.x = 368;
                    this.y += 33;
                }
            }
        }
    }
}
let biden = {   
    unique:[],
    seen:[],
    x: 18,
    y: 20,
    words:{},
    keys: [],
    display: function(){
        this.keys.sort(compare);

        function compare(a, b) {
            var countA = biden.words[a];
            var countB = biden.words[b];
            return countA - countB;
        }

        for (let k of this.keys){
            if (this.words[k]>5){ // do not print out words that appear less than 3 times
                let size = map(this.words[k],this.words[this.keys[0]],this.words[this.keys[this.keys.length-1]],5,33);
                let color = map(this.words[k],this.words[this.keys[0]],this.words[this.keys[this.keys.length-1]],150,255);
                fill(color);
                textSize(size);
                // console.log("here");
                text(k,this.x,this.y);
                let wordWidth = textWidth(k)+(size*0.40);
                this.x += wordWidth;

                if (this.x + wordWidth+12>width/2){
                    this.x = 18;
                    this.y += 33;
                }
            }
        }
    }
}
let chris = {   
    words:{},
    keys: [],
    x: 18,
    y: 500,
    display: function(){
        this.keys.sort(compare);

        function compare(a, b) {
            var countA = chris.words[a];
            var countB = chris.words[b];
            return countA - countB;
        }

        for (let k of this.keys){
            if (this.words[k]>4){ // do not print out words that appear less than 3 times
                let size = map(this.words[k],this.words[this.keys[0]],this.words[this.keys[this.keys.length-1]],5,33);
                let color = map(this.words[k],this.words[this.keys[0]],this.words[this.keys[this.keys.length-1]],150,255);
                fill(color);
                textSize(size);
                
                text(k,this.x,this.y);
                let wordWidth = textWidth(k)+(size*0.40);
                this.x += wordWidth;

                if (this.x + wordWidth+12>width){
                    this.x = 18;
                    this.y += 33;
                }
            }
        }
    }
}

function preload(){
    data = loadStrings("2020 Joe Biden Donald Trump 1st Debate.txt");
    trump.img = loadImage("trump.jpg");
    biden.img = loadImage("biden.jpeg");
    chris.img = loadImage("chris_wallace.jpg");
}

function setup() {
    let c = createCanvas(700,700);
    c.parent("main");
    background(0);
    noStroke();
    for (let s of data){
        if (s === "Chris Wallace:"){
            person = 0;
        }
        else if (s === "Vice President Joe Biden:")
        {
            person = 1;
        }
        else if (s === "President Donald J. Trump:"){
            person = 2;
        }
        else if (s !== ""){
            analyze(person,s);
        }

    }

    tint(255, 150);
    image(biden.img,0,0,width/2, height/1.5);
    image(trump.img,width/2,0,width/2, height/1.5);
    push();
    imageMode(CENTER);
    image(chris.img, width/2,580,250,220);
    pop();
    chris.display();
    biden.display();
    trump.display();
    
    
}

function analyze(person, p){
    let paragraph = p.toLowerCase();
    paragraph = paragraph.split(" ");

    // update the dictionary depending on the person
    if (person == 0){
        for (let w of paragraph){
            w = RiTa.trimPunctuation(w);
            if (!articles.includes(w)){ // don't include articles
                if (chris.keys.includes(w)){
                    chris.words[w]+=1;
                }
                else{
                    chris.keys.push(w);
                    chris.words[w]=1;
                }
            }
        }
    }
    else if (person == 1){
        for (let w of paragraph){
            w = RiTa.trimPunctuation(w);
            if (!articles.includes(w)){ // don't include articles
                if (biden.keys.includes(w)){
                    biden.words[w]+=1;
                }
                else{
                    biden.keys.push(w);
                    biden.words[w]=1;
                }
            }
        }
    }

    else {
        for (let w of paragraph){
            w = RiTa.trimPunctuation(w);
            if (!articles.includes(w)){ // don't include articles
                if (trump.keys.includes(w)){
                    trump.words[w]+=1;
                }
                else{
                    trump.keys.push(w);
                    trump.words[w]=1;
                }
            }
        }
    }

}




