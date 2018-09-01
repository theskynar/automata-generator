#include <stdio.h>

char m[80];
int i = 0;

void aceita();
void rejeita();

<% head %>

void rejeita() 
{
    printf("Rejeita");
}

void aceita() 
{
    printf("Aceita");
}

int main() 
{
    gets(m);
    <% main %>

    return 0;
}