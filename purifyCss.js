const CSSAsset = (function() {
  try {
    return require("parcel/src/assets/CSSAsset");
  } catch (e) {
    return require("parcel-bundler/src/assets/CSSAsset");
  }
})();

const purify = require("purify-css");

class PurifiedCssAsset extends CSSAsset {
  async load() {
    if (process.env.NODE_ENV !== "production") {
      return await super.load();
    }

    const extensions = [ "html", "js", "jsx", "vue", "svelte" ];
    const content = extensions.map(ext => `${ this.options.rootDir }/**/*.${ ext }`);
    const source = await super.load();
    return await new Promise(r => purify(content, source, r));
  }
}

module.exports = PurifiedCssAsset;
