import {HttpStatus} from "@nestjs/common";

export const NOT_ERROR_STATUSES: Array<HttpStatus> = [
    HttpStatus.CONTINUE,
    HttpStatus.SWITCHING_PROTOCOLS,
    HttpStatus.PROCESSING,
    HttpStatus.EARLYHINTS,
    HttpStatus.OK,
    HttpStatus.CREATED,
    HttpStatus.ACCEPTED,
    HttpStatus.NON_AUTHORITATIVE_INFORMATION,
    HttpStatus.NO_CONTENT,
    HttpStatus.RESET_CONTENT,
    HttpStatus.PARTIAL_CONTENT,
    HttpStatus.AMBIGUOUS,
    HttpStatus.MOVED_PERMANENTLY,
    HttpStatus.FOUND,
    HttpStatus.SEE_OTHER,
    HttpStatus.NOT_MODIFIED,
    HttpStatus.TEMPORARY_REDIRECT,
    HttpStatus.PERMANENT_REDIRECT,
    HttpStatus.MISDIRECTED,
    HttpStatus.UNPROCESSABLE_ENTITY
];