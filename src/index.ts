// import { init, exit } from "./myPackage";
// npm i -D ts-node 
// ts-node를 설치하면 빌드 없이 타입스크립트를 실행할 수 있게 됨
// 개발환경에서만 사용하는것. 빌드없이 빠르게 새로고침 하기 위한 것. ts-node가 컴파일 할 필요 없이 
// 타입스크립트 코드를 대신 실행해줌
// 필요하다면 nodemon을 설치 (npm i nodemon)
// nodemon 설치하면 자동으로 커맨드를 재 실행해줘서 일일히 커맨드를 다시 실행할 필요가 없음. 서버를 재시작할 필요가 없음. 

// 간단한 블록체인 만들기
// 블록체인은 여러 개의 블록이 사슬 처럼 묶인 것. 그 블록 안에는 데이터가 들어있음. 블록체인으로 보호하고 싶은 데이터가 
// 그리고 이 블록은 다른 블록에 묶여있음. 그 연결고리는 해쉬값임. 서로 체인 처럼 연결되어 있음. 
import crypto from "crypto";
 
interface BlockShape {
  hash : string;  
  prevHash : string; // 이전 해쉬 값이 필요함
  height : number;  // 블록의 위치를 표시해주는 숫자
  data : string; // 블록이 보호해줄 데이터
}

class Block implements BlockShape {
  public hash : string;
  constructor (
    public prevHash : string,
    public height : number, 
    public data : string
  ) {
      this.hash = Block.calculateHash(prevHash, height, data); 
  }
  static calculateHash(prevHash: string, height: number, data : string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex")
  }
}
// 블록의 hash 값은 prevHash, height, data 값을 이용해서 계산 됨. 해쉬는 그 블록의 고유 서명과 같음
// 이 세개의 값을 이용해서 새로운 해쉬값 문자열을 만들어 줘야 함. 
// 해쉬의 장점은 데이터가 변하지 않으면 해쉬값도 변하지 않음. 이것이 블록체인에서 블록을 보호하는 방법임.
// 이걸 이용하면 블록체인의 블록 정보가 수정되지 않았다는 걸 확인할 수 있음.

// static 함수는 살아있지 않은 함수도 불러올 수 있음. 
// const p = new Player() -> 이 p 변수는 살아있음(클래스의 인스턴스). 뒤의 new Player()는 청사진일 뿐임. 
// p.kickBall() -> static이 아닌 함수는 살아있는 클래스만 부를 수 있음. 

class Blockchain {
  private blocks : Block[]
  constructor(){
    this.blocks = [];
  }
  private getPreHash(){
    if(this.blocks.length === 0) return "" // 첫번째 해쉬값이 없으므로 "" 
    return this.blocks[this.blocks.length - 1].hash; // 해쉬값 있으면 마지막 블럭의 해쉬값을 리턴
  }
  public addBlock(data:string){ // 새로운 블록을 추가할 때 블록에 저장하고 싶은 데이터를 보내줘야함
    const newBlock = new Block(this.getPreHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock); // 새로 생성한 블록을 배열에 넣어주면 됨
  }
  public getBlocks(){ // 블록에 접근할 수 있는 함수 
    return [...this.blocks]; // 그냥 return this.blocks 해주면 아래처럼 새로운 블록 추가해서 해킹할 수 있음. 배열로 만들어주기
  }
}

const blockchain = new Blockchain(); // 새로운 블록체인 생성

blockchain.addBlock("First one"); // 새로운 블록 추가
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

blockchain.getBlocks().push(new Block("xxxxxxx", 111111, "HACKEDDDD"));

console.log(blockchain.getBlocks());