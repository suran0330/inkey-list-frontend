"use strict";
var util_sliceBlocks = require("./util.slice-blocks.cjs");
function isTextBlock(context, block) {
  return util_sliceBlocks.isTypedObject(block) && block._type === context.schema.block.name;
}
function mergeTextBlocks({
  context,
  targetBlock,
  incomingBlock
}) {
  const parsedIncomingBlock = util_sliceBlocks.parseBlock({
    context,
    block: incomingBlock,
    options: {
      refreshKeys: !0,
      validateFields: !0
    }
  });
  return !parsedIncomingBlock || !isTextBlock(context, parsedIncomingBlock) ? targetBlock : {
    ...targetBlock,
    children: [...targetBlock.children, ...parsedIncomingBlock.children],
    markDefs: [...targetBlock.markDefs ?? [], ...parsedIncomingBlock.markDefs ?? []]
  };
}
exports.isTextBlock = isTextBlock;
exports.mergeTextBlocks = mergeTextBlocks;
//# sourceMappingURL=util.merge-text-blocks.cjs.map
