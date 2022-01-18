async function download(url, filename, isText = false) {
  let content = isText ? new Blob([JSON.stringify(url, null, '  ')]) : await fetch(url).then(res => res.blob())
  content = window.URL.createObjectURL(content)
  const a = document.createElement('a')
  a.href = content
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(content)
}

export default download
