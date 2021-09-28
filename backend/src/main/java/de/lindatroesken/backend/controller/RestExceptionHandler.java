package de.lindatroesken.backend.controller;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

@Slf4j
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {



    @ExceptionHandler({
            IllegalArgumentException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<RestException> handle400(Throwable e) {
        return createRestException(e, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler({
            UnauthorizedUserException.class
    })
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<RestException> handle401(Throwable e) {
        return createRestException(e, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({
            EntityNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<RestException> handle404(Throwable e) {
        return createRestException(e, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            EntityExistsException.class
    })
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<RestException> handle409(Throwable e) {
        return createRestException(e, HttpStatus.CONFLICT);
    }

    private ResponseEntity<RestException> createRestException(Throwable e, HttpStatus httpStatus){
        RestException restException = new RestException(e.getMessage(), httpStatus);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        log.info("Handled Exception: " + restException.message);

        return new ResponseEntity<>(restException, httpHeaders, httpStatus);
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class RestException {
        private String message;
        private int status;

        public RestException(String message, HttpStatus httpStatus) {
            this.message = message;
            this.status = httpStatus.value();
        }
    }

}
