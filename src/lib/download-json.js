// browser download
const downloadJson = (document, content) => {
  const a = document.createElement('a')
  const file = new Blob([content], { type: 'text/plain' })
  a.href = URL.createObjectURL(file)
  a.download = 'json.txt'
  a.click()
}

export { downloadJson }
