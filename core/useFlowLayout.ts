import { useScheduler,MeshPath,MeshFlowTaskNode } from "@meshflow/core";
 

export function useFlowLayout(
  
){

  let data:any[]  = []  
  let boxLen = 19;

  for(let i = 0;i<3;i++){
    const path = `zone${i}`;

    let obj = {
      path: path,
      type: "zone",
     
      state: { 
        value: 300, 
        currentLoad:0,
        capacity:0,
        index:i,
        children:{}
      },
      meta: {
        currentLoad:0,
        children:{}
       },
     
      notifyKeys: new Set([ ]),
      
    }
    data.push(obj)
 
  }

  for(let i = 0 ;i<boxLen;i++){
    const path = `box${i}`;
    const num = Math.random();
    const priority = num>0.7 ? 3
    :num>0.3 ? 2
    :1
    const width = priority==3?100:priority==2?80:50
    const maxAmount = priority==3?90:priority==2?70:40

    const obj = {
      path:path,
      type:'box',
      state:{
        parent:"",
        width:width,
        height:100,
        maxAmount:maxAmount,
        parentPos:{},
        pos:{},
        isDead:false
      },
      meta:{},
      notifyKeys: new Set([ ]),
    }
    data.push(obj)
  }

  const judgement = {
    path:'judgement',
    type:'judgement',
    state:{
      zoneState:{}
    },
    meta:{
      zoneState:{}
    },
    notifyKeys: new Set([]),
  }

  data.push(judgement);

  const useFlowLayoutModule = <T,P extends MeshPath>(
    scheduler: ReturnType<typeof useScheduler<T, P>>,
    rootSchema:any[]
  )=>{
    const ZoneArray:MeshFlowTaskNode<P>['proxy'][] = [];
    let BoxArray :MeshFlowTaskNode<P>['proxy'][] = []
    let judgementNode:any = null;
    for(let item of rootSchema){
      const node = scheduler.registerNode(item);
    
      if(node.type==='zone'){
        ZoneArray.push(node.createView())
      }
      if(node.type==='box'){
        BoxArray.push(node.createView())
      }
      if(node.type==='judgement'){
        judgementNode = node.createView()
      }
    }

    const AddNewBox = ()=>{
      boxLen++;
      const path = `box${boxLen}`;
      const num = Math.random();
      const priority = num>0.7 ? 3
      :num>0.3 ? 2
      :1
      const width = priority==3?100:priority==2?80:50
      const maxAmount = priority==3?90:priority==2?70:40
  
      const obj:any = {
        path:path,
        type:'box',
        state:{
          parent:"",
          width:width,
          height:100,
          maxAmount:maxAmount,
          parentPos:{},
          pos:{},
          isDead:false
        },
        meta:{},
        notifyKeys: new Set([ ]),
      };
      const node = scheduler.registerNode(obj);
      return node;
    }

    return {
      ZoneArray,
      BoxArray,
      judgementNode,
      AddNewBox 
    }
  }
 
  return {
    data ,
    useFlowLayoutModule
  }
}