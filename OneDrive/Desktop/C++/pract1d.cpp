// Ques::Calculate the Product of all elements in the given array.
/*#include<iostream>
using namespace std;
int main(){
    int Product=1;
    int n;
    cout<<"array size:";
    cin>>n;
    int arr[n];
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    for(int i=0;i<n;i++){
        Product*=arr[i];

    }
    cout<<Product;
}*/
// using function
/*#include<iostream>
using namespace std;
int product(int a[], int n){
    int Product=1;
    for(int i=0; i<n; i++){
        Product*=a[i];

    }
    return Product;

}
int main(){
    int n;
    cout<<"Enter n:";
    cin>>n;
    int arr[n];
    for(int i=0; i<n; i++){
        cin>>arr[i];
    }
    cout<<"product of array:"<<product(arr,n);
}*/

// Ques::Find the second largest element in the given Array in one pass
/*#include<iostream>
#include<climits>
using namespace std;
int main(){
    int max1=INT_MIN;
    int max2=INT_MIN;
    int n;
    cout<<"Enter array size : ";
    cin>>n;
    int arr[n];
    for(int i=0; i<n; i++){
        cin>>arr[i];
    }
    for(int i=0; i<n; i++){
        if(max1<arr[i]){
            max1=arr[i];
        }
    }
    cout<<max1;
    cout<<endl;
    for(int i=0; i<n; i++){
    if(arr[i]!=max1 && max2<arr[i])
    max2=arr[i];
    }
    cout<<max2;
}*/

/*#include <iostream>
#include <climits>
#include <vector>
using namespace std;
int main()
{
    int max1 = INT_MIN;
    int max2 = INT_MIN;
    int n;
    cout << "Enetr vector size : ";
    cin >> n;
    vector<int> v;
    cout << "enter vector element";
    for (int i = 0; i < n; i++)
    {
        int m;
        cin >> m;
        v.push_back(m);
    }
    for (int i = 0; i < v.size(); i++)
    {
        if (max1 < v[i])
        {
            max1 = v[i];
        }
    }
    cout << max1;
}*/

//By sir
/*#include<iostream>
#include<climits>
using namespace std;
int secondLargest(int a[], int n){
    int max1=INT_MIN;
    int max2=INT_MIN;

    for(int i=0; i<n; i++){
        if(a[i]>max1){
            max2=max1;
            max1=a[i];
        }
        else if(max2 < a[i] && a[i]!=max1){
            max2=a[i];
        }
    }
    return max2;
}
int main(){
    int n;
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    int secondMax = secondLargest(a,n);
    if(secondMax == INT_MIN) cout<<"this array doesnt contain any second largest number.";
    else cout<<"The second largest no is :"<<secondMax<<endl;
}*/

//Ques::Find the minimum value out of all the elements in the array.
/*#include<iostream>
#include<climits>
using namespace std;
int minimum(int a, int b){
    if(a<b){
        return a;
    }
    else{
        return b;
    }
}
int main(){
    int n;
    cout<<"Enter the array size : ";
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    int min=INT_MAX;
    for(int i=0; i<n; i++){
        min = minimum(a[i], min);

    }
    cout<<"The minimum number is : "<<min;
}*/

//by using inbuilt function
/*#include<iostream>
#include<climits>
using namespace std;
int main(){
    int n;
    cout<<"Enter the array size : ";
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    int mini=INT_MAX;
    for(int i=0; i<n; i++){
        mini = max(a[i], mini);

    }
    cout<<"The minimum number is : "<<mini;
}*/

//Ques::Given an array, predict if the array contains duplicates or not.
/*#include<iostream>
using namespace std;
bool duplicates(int a[], int n){
    for(int i=0; i<n; i++){
        for(int j=i+1; j<n; j++){
            if(a[i]==a[j]){
                return true;
            }
        }
    }
    return false;
}
int main(){
    int n;
    cout<<"Enter size of array: ";
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++){
        cin>>a[i];
    }

    // if(duplicates(a,n)) cout<<"Yes";
    // cout<<"no";
    // if(duplicates(a, n)==true) cout<<"Yes, ";
    // else
    // cout<<"Ayein";
}*/

// Guess output
#include<iostream>
using namespace std;
int main(){
    int sub[50], i;
    for(i=0; i<=48; i++);
    {
        sub[i]=i;
        cout<<sub[i]<<endl;
    }
}




