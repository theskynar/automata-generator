#include <stdio.h>

char m[80];
int i = -1;

void aceita();
void rejeita();

void E0();
void E1();
void E2();

void E0() {
    i++;
    
    if (m[i] == 'a') {
        E1();
        return;
    }
    
    if (m[i] == 'b') {
        E0();
        return;
    }
    
    if (m[i] == 'c') {
        E0();
        return;
    }
     
    if (m[i] == '\0') {
        aceita();
        return;
    }
    
    rejeita();
}

void E1() {
    i++;
    
    if (m[i] == 'a') {
        E0();
        return;
    }
    
    if (m[i] == 'b') {
        E2();
        return;
    }
     
    rejeita();
}

void E2() {
    i++;
    
    if (m[i] == 'b') {
        E1();
        return;
    }
     
    if (m[i] == '\0') {
        aceita();
        return;
    }
    
    rejeita();
}

void rejeita() {
    printf("Rejeita");
}

void aceita() {
    printf("Aceita");
}

int main() {
    gets(m);
    E1();

    return 0;
}