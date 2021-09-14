package de.lindatroesken.backend.controller;

public class UnauthorizedUserException extends RuntimeException {

    public UnauthorizedUserException(String message){
        super(message);
    }
}
