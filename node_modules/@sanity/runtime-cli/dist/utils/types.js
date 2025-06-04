export function isLocalFunctionResource(r) {
    return r.type.startsWith('sanity.function.');
}
/** @internal */
export var BlueprintParserErrorType;
(function (BlueprintParserErrorType) {
    BlueprintParserErrorType["InvalidProperty"] = "invalid_property";
    BlueprintParserErrorType["InvalidVersion"] = "invalid_version";
    BlueprintParserErrorType["InvalidType"] = "invalid_type";
    BlueprintParserErrorType["MissingRequiredProperty"] = "missing_required_property";
    BlueprintParserErrorType["DuplicateName"] = "duplicate_name";
    BlueprintParserErrorType["InvalidFormat"] = "invalid_format";
    BlueprintParserErrorType["InvalidValue"] = "invalid_value";
    BlueprintParserErrorType["JsonValidationError"] = "json_validation_error";
    BlueprintParserErrorType["InvalidInput"] = "invalid_input";
    BlueprintParserErrorType["MissingParameter"] = "missing_parameter";
})(BlueprintParserErrorType || (BlueprintParserErrorType = {}));
