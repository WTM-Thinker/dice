export function isIos(){
    return /(iphone|ipad|ios)/i.test(navigator.userAgent)
}
export function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
export function getDeviceWidth(){
    return screen.width;
}