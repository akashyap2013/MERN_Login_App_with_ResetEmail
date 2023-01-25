"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoMemoryServer = exports.MongoMemoryReplSet = exports.MongoInstance = exports.MongoBinary = void 0;
require("./util/resolveConfig"); // import it for the side-effects (globals)
const MongoMemoryServer_1 = require("./MongoMemoryServer");
Object.defineProperty(exports, "MongoMemoryServer", { enumerable: true, get: function () { return MongoMemoryServer_1.MongoMemoryServer; } });
var MongoBinary_1 = require("./util/MongoBinary");
Object.defineProperty(exports, "MongoBinary", { enumerable: true, get: function () { return MongoBinary_1.MongoBinary; } });
var MongoInstance_1 = require("./util/MongoInstance");
Object.defineProperty(exports, "MongoInstance", { enumerable: true, get: function () { return MongoInstance_1.MongoInstance; } });
var MongoMemoryReplSet_1 = require("./MongoMemoryReplSet");
Object.defineProperty(exports, "MongoMemoryReplSet", { enumerable: true, get: function () { return MongoMemoryReplSet_1.MongoMemoryReplSet; } });
exports.default = MongoMemoryServer_1.MongoMemoryServer;
//# sourceMappingURL=index.js.map