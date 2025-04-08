//Ques::Write a program to store 10 at every index of a 2d matrix with 5 rows and 5 cols
#include<iostream>
using namespace std;
int main(){
    int a[5][5];
    for(int i=0; i<5; i++){
        for(int j=0; j<5; j++){
            cin>>a[i][j];
        }
    }
    cout<<endl;
    for(int i=0; i<5; i++){
        for(int j=0; j<5; j++){
            cout<<a[i][j]<<" ";
        }
        cout<<endl;
    }
}