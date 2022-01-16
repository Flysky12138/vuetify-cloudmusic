// 创建标签
export default (() => {
  const tag = document.createElement('style')
  tag.setAttribute('type', 'text/css')
  tag.setAttribute('id', 'user-css')
  tag.innerHTML = localStorage.getItem('css')
  document.querySelector('head').appendChild(tag)
})()
