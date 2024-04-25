const parseHtmlFromNode = (node) => {
  if (!node) return

  const filteredChildren = Array.from(node.children).filter(n => n.tagName !== 'sup')

  return (
    filteredChildren.length
      ? node.children[0].innerHTML
      : node.innerHTML
  ).replace('\n', '')
}

module.exports = {
  parseHtmlFromNode
}
