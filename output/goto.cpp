#include <stdio.h>

using namespace std;

int main() {
    int i = -1;
    char m[80];

    gets(m);

    goto E0;

E0:
    i++;
    
    if (m[i] == 'a') {
        goto E1;
    }
    
    if (m[i] == 'b') {
        goto E0;
    }
    
    if (m[i] == 'c') {
        goto E0;
    }
     
    goto rejeita;

E1:
    i++;
    
    if (m[i] == 'a') {
        goto E1;
    }
    
    if (m[i] == 'b') {
        goto E2;
    }
    
    if (m[i] == 'c') {
        goto E0;
    }
     
    goto rejeita;

E2:
    i++;
    
    if (m[i] == 'a') {
        goto E2;
    }
    
    if (m[i] == 'b') {
        goto E2;
    }
    
    if (m[i] == 'c') {
        goto E2;
    }
     
    if (m[i] == '\0') {
        goto aceita;
    }
    
    goto rejeita;

aceita:
    printf("Aceito!");
    return 0;

rejeita:
    printf("Rejeitado!");
    return 0;
}