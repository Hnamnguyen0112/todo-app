package utils

import (
	"net/mail"

	"github.com/gofiber/fiber/v2"
)

var StatusCodeMessages = map[int]string{
	fiber.StatusContinue:                      "Continue",
	fiber.StatusSwitchingProtocols:            "Switching Protocols",
	fiber.StatusProcessing:                    "Processing",
	fiber.StatusEarlyHints:                    "Early Hints",
	fiber.StatusOK:                            "OK",
	fiber.StatusCreated:                       "Created",
	fiber.StatusAccepted:                      "Accepted",
	fiber.StatusNonAuthoritativeInformation:   "Non-Authoritative Information",
	fiber.StatusNoContent:                     "No Content",
	fiber.StatusResetContent:                  "Reset Content",
	fiber.StatusPartialContent:                "Partial Content",
	fiber.StatusMultiStatus:                   "Multi-Status",
	fiber.StatusAlreadyReported:               "Already Reported",
	fiber.StatusIMUsed:                        "IM Used",
	fiber.StatusMultipleChoices:               "Multiple Choices",
	fiber.StatusMovedPermanently:              "Moved Permanently",
	fiber.StatusFound:                         "Found",
	fiber.StatusSeeOther:                      "See Other",
	fiber.StatusNotModified:                   "Not Modified",
	fiber.StatusUseProxy:                      "Use Proxy",
	fiber.StatusTemporaryRedirect:             "Temporary Redirect",
	fiber.StatusPermanentRedirect:             "Permanent Redirect",
	fiber.StatusBadRequest:                    "Bad Request",
	fiber.StatusUnauthorized:                  "Unauthorized",
	fiber.StatusPaymentRequired:               "Payment Required",
	fiber.StatusForbidden:                     "Forbidden",
	fiber.StatusNotFound:                      "Not Found",
	fiber.StatusMethodNotAllowed:              "Method Not Allowed",
	fiber.StatusNotAcceptable:                 "Not Acceptable",
	fiber.StatusProxyAuthRequired:             "Proxy Authentication Required",
	fiber.StatusRequestTimeout:                "Request Timeout",
	fiber.StatusConflict:                      "Conflict",
	fiber.StatusGone:                          "Gone",
	fiber.StatusLengthRequired:                "Length Required",
	fiber.StatusPreconditionFailed:            "Precondition Failed",
	fiber.StatusRequestEntityTooLarge:         "Request Entity Too Large",
	fiber.StatusRequestURITooLong:             "Request-URI Too Long",
	fiber.StatusUnsupportedMediaType:          "Unsupported Media Type",
	fiber.StatusRequestedRangeNotSatisfiable:  "Requested Range Not Satisfiable",
	fiber.StatusExpectationFailed:             "Expectation Failed",
	fiber.StatusTeapot:                        "I'm a teapot",
	fiber.StatusMisdirectedRequest:            "Misdirected Request",
	fiber.StatusUnprocessableEntity:           "Unprocessable Entity",
	fiber.StatusLocked:                        "Locked",
	fiber.StatusFailedDependency:              "Failed Dependency",
	fiber.StatusTooEarly:                      "Too Early",
	fiber.StatusUpgradeRequired:               "Upgrade Required",
	fiber.StatusPreconditionRequired:          "Precondition Required",
	fiber.StatusTooManyRequests:               "Too Many Requests",
	fiber.StatusRequestHeaderFieldsTooLarge:   "Request Header Fields Too Large",
	fiber.StatusUnavailableForLegalReasons:    "Unavailable For Legal Reasons",
	fiber.StatusInternalServerError:           "Internal Server Error",
	fiber.StatusNotImplemented:                "Not Implemented",
	fiber.StatusBadGateway:                    "Bad Gateway",
	fiber.StatusServiceUnavailable:            "Service Unavailable",
	fiber.StatusGatewayTimeout:                "Gateway Timeout",
	fiber.StatusHTTPVersionNotSupported:       "HTTP Version Not Supported",
	fiber.StatusVariantAlsoNegotiates:         "Variant Also Negotiates",
	fiber.StatusInsufficientStorage:           "Insufficient Storage",
	fiber.StatusLoopDetected:                  "Loop Detected",
	fiber.StatusNotExtended:                   "Not Extended",
	fiber.StatusNetworkAuthenticationRequired: "Network Authentication Required",
}

func IsEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
