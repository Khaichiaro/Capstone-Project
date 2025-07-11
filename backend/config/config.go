package config

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(Password, hash []byte) bool{
	err := bcrypt.CompareHashAndPassword(hash, Password)
	return err == nil
}