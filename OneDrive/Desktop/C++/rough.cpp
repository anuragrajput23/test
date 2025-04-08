#include<iostream>
using namespace std;
int main(){
    int m,n;
    cout<<"Enter your row size: ";
    cin>>m;
    cout<<"Enter your cols size: ";
    cin>>n;

    int arr[m][n];
    //input
    for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cin>>arr[i][j];
        }
    }
    //printing
    for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
    //column wise printing
    for(int j=0; j<n; j++){
        for(int i=0; i<m; i++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }

    // for(int i=0; i<m; i++){
    //     if(i%2==0){
    //         for(int j=0; j<n; j++){
    //             cout<<arr[i][j]<<" ";
    //         }
    //         cout<<endl;
    //     }
    //     else{
    //         for(int j=n-1; j>=0; j--){
    //             cout<<arr[i][j]<<" ";
    //         }
    //         cout<<endl;
    //     }
    // }
}