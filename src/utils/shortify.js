export default function(s,start,end){
    if(start===undefined){return this;}
    if(end===undefined){
        if(s.length>start){return `${s.slice(0,start)}...`}
        return s;
    }
    if (s.length>start+end){return `${s.slice(0,start)}...${s.slice(s.length-end)}`};
    return s
}

function middleEllipse(str) {
    return str.substr(0, 4) + "..." + str.substr(str.length - 4, str.length);
  }
  
export function toShort(str) {
if (str && str.length > 20) {
    if (/vite_[A-Za-z0-9]+/.test(str)) {
    str = str.slice(5);
    return "vite_" + middleEllipse(str);
    }
    if (/tti_[A-Za-z0-9]+/.test(str)) {
    str = str.slice(4);
    return "tti_" + middleEllipse(str);
    }
    return middleEllipse(str);
} else {
    return str;
}
}