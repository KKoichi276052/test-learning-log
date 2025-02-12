import{j as d}from"./jsx-runtime-CLpGMVip.js";import{f as y}from"./index-b_ar5DQs.js";const l=({label:m,primary:i,onClick:u})=>{const p=i?{backgroundColor:"blue",color:"white"}:{backgroundColor:"white",color:"blue"};return d.jsx("button",{type:"button",style:p,onClick:u,children:m})};l.__docgenInfo={description:"",methods:[],displayName:"Button"};const f={title:"Button",component:l,args:{onClick:y()},argTypes:{label:{options:["Primary","Secondary"],control:{type:"select"}}}},r={args:{label:"Primary Button",primary:!0}},o={args:{label:"Secondary Button",primary:!1}};var e,t,a;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    label: "Primary Button",
    primary: true
  }
}`,...(a=(t=r.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};var n,s,c;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: "Secondary Button",
    primary: false
  }
}`,...(c=(s=o.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};const S=["Primary","Secondary"];export{r as Primary,o as Secondary,S as __namedExportsOrder,f as default};
