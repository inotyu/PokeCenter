"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePokemonDto = exports.CreatePokemonDto = void 0;
const class_validator_1 = require("class-validator");
let CreatePokemonDto = (() => {
    var _a;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _level_decorators;
    let _level_initializers = [];
    let _level_extraInitializers = [];
    let _hp_decorators;
    let _hp_initializers = [];
    let _hp_extraInitializers = [];
    let _pokedexNumber_decorators;
    let _pokedexNumber_initializers = [];
    let _pokedexNumber_extraInitializers = [];
    let _imageUrl_decorators;
    let _imageUrl_initializers = [];
    let _imageUrl_extraInitializers = [];
    return _a = class CreatePokemonDto {
            constructor() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.type = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.level = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _level_initializers, void 0));
                this.hp = (__runInitializers(this, _level_extraInitializers), __runInitializers(this, _hp_initializers, void 0));
                this.pokedexNumber = (__runInitializers(this, _hp_extraInitializers), __runInitializers(this, _pokedexNumber_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _pokedexNumber_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                __runInitializers(this, _imageUrl_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)()];
            _type_decorators = [(0, class_validator_1.IsString)()];
            _level_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _hp_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(999)];
            _pokedexNumber_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(1000)];
            _imageUrl_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _level_decorators, { kind: "field", name: "level", static: false, private: false, access: { has: obj => "level" in obj, get: obj => obj.level, set: (obj, value) => { obj.level = value; } }, metadata: _metadata }, _level_initializers, _level_extraInitializers);
            __esDecorate(null, null, _hp_decorators, { kind: "field", name: "hp", static: false, private: false, access: { has: obj => "hp" in obj, get: obj => obj.hp, set: (obj, value) => { obj.hp = value; } }, metadata: _metadata }, _hp_initializers, _hp_extraInitializers);
            __esDecorate(null, null, _pokedexNumber_decorators, { kind: "field", name: "pokedexNumber", static: false, private: false, access: { has: obj => "pokedexNumber" in obj, get: obj => obj.pokedexNumber, set: (obj, value) => { obj.pokedexNumber = value; } }, metadata: _metadata }, _pokedexNumber_initializers, _pokedexNumber_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: obj => "imageUrl" in obj, get: obj => obj.imageUrl, set: (obj, value) => { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreatePokemonDto = CreatePokemonDto;
let UpdatePokemonDto = (() => {
    var _a;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _level_decorators;
    let _level_initializers = [];
    let _level_extraInitializers = [];
    let _hp_decorators;
    let _hp_initializers = [];
    let _hp_extraInitializers = [];
    let _pokedexNumber_decorators;
    let _pokedexNumber_initializers = [];
    let _pokedexNumber_extraInitializers = [];
    let _imageUrl_decorators;
    let _imageUrl_initializers = [];
    let _imageUrl_extraInitializers = [];
    return _a = class UpdatePokemonDto {
            constructor() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.type = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.level = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _level_initializers, void 0));
                this.hp = (__runInitializers(this, _level_extraInitializers), __runInitializers(this, _hp_initializers, void 0));
                this.pokedexNumber = (__runInitializers(this, _hp_extraInitializers), __runInitializers(this, _pokedexNumber_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _pokedexNumber_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                __runInitializers(this, _imageUrl_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _type_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _level_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _hp_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(999)];
            _pokedexNumber_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(1000)];
            _imageUrl_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _level_decorators, { kind: "field", name: "level", static: false, private: false, access: { has: obj => "level" in obj, get: obj => obj.level, set: (obj, value) => { obj.level = value; } }, metadata: _metadata }, _level_initializers, _level_extraInitializers);
            __esDecorate(null, null, _hp_decorators, { kind: "field", name: "hp", static: false, private: false, access: { has: obj => "hp" in obj, get: obj => obj.hp, set: (obj, value) => { obj.hp = value; } }, metadata: _metadata }, _hp_initializers, _hp_extraInitializers);
            __esDecorate(null, null, _pokedexNumber_decorators, { kind: "field", name: "pokedexNumber", static: false, private: false, access: { has: obj => "pokedexNumber" in obj, get: obj => obj.pokedexNumber, set: (obj, value) => { obj.pokedexNumber = value; } }, metadata: _metadata }, _pokedexNumber_initializers, _pokedexNumber_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: obj => "imageUrl" in obj, get: obj => obj.imageUrl, set: (obj, value) => { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdatePokemonDto = UpdatePokemonDto;
