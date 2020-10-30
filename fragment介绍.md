# Document.createDocumentFragment()
  
  [fragment ](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)
  
  
  > DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。
因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能

所以,我们在内存中编译fragment(文档碎片) , 在吧fragment一次性的添加到页面, 这样性能很高
