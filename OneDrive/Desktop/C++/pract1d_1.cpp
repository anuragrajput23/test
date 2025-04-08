//Ques::Count the number of elements strictly greater than x in the given array.
/*#include<iostream>
using namespace std;
int checkGreater(int a[], int n, int key){
    int count = 0;
    for(int i=0; i<n;i++){
        if(a[i]>key){
            count++;
        }
    }
    return count;
}
int main(){
    int key=12;
    int n;
    cout<<"Enter array size:";
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    int res = checkGreater(a,n,key);
    cout<<res;
}*/

//Ques::WAP to find the largsest three elements in the array.

/*#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;
int main(){
    int n;
    cout<<"ENter the size of the array : \n";
    cin>>n;
    vector<int> v;
    cout<<"Enter the elements of the array : \n";
    for(int i=0;i<n;i++){
        int q;
        cin>>q;
        v.push_back(q);
    }

    sort(v.begin(),v.end());
    for(int i=0;i<n;i++){
        cout<<v[i]<<" ";
    }cout<<endl;

    for(int i=n-1;i>=n-3;i--){
        cout<<v[i]<<" ";
    }
    return 0;
}*/
/*OR by mam*/
/*#include<iostream>
#include<climits>
using namespace std;
void threeGreatest(int a[], int n){
    int max1 = INT_MIN, max2 = INT_MIN, max3 = INT_MIN;
    for(int i=0; i<n; i++){
        if(a[i]>max1){
            max3=max2;
            max2=max1;
            max1=a[i];
        }
        else if(a[i]>max2){
            max3=max2;
            max2=a[i];
        }
        else if(a[i]>max3){
            max3=a[i];
        }
    }
    if(max1 == INT_MIN) cout<<"no max num";
    else cout<<max1<<" ";

    if(max2 == INT_MIN) cout<<"no 2nd max num";
    else cout<<max2<<" ";

    if(max2 == INT_MIN) cout<<"no 3rd max num";
    else cout<<max3<<" ";
}
int main(){
    int n;
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    threeGreatest(a, n);
}*/

//Ques::Check if the given array is sorted or not.
/*#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;
int main(){
    int n;
    cout<<"Enter size of array:";
    cin>>n;
    cout<<"enter array elements:";
    vector<int> v;
    for(int i=0; i<n; i++){
        int q;
        cin>>q;
        v.push_back(q);
    }
    // bool flag=true;
    for(int i=0; i<n; i++){
        if(v[i]<=v[i+1]){
           cout<<"sorted\n";
           break;
        }
        else{
            cout<<"not sorted\n";
            break;
        }
    }
}*/
//by mam// i have doubt in this code related to int i; declaration in the

/*#include<iostream>
using namespace std;
int main(){
    int n;
    cin>>n;
    int a[n];
    // int i;
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    int i;
    for(int i=0; i<n-1;i++){
        if(a[i]>a[i+1]){
            break;
        }
    }
    if(i==n-1) cout<<"The array is sorted.";
    else cout<<"The array is unsorted.";
}*/

//Ques::Find the differrence between the sum of elements at even indices to the sum of elements at odd indices.

/*#include<iostream>
using namespace std;
int main(){
    int n;
    cin>>n;
    int a[n];
    int i;
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    int even=0;
    int odd=0;
        for(int i=0; i<n; i++){
            if(i%2==0){
            even+=a[i];
        }
        else{
            odd+=a[i];
        }
    }
    // int odd=0;
    //     for(int i=0; i<n; i++){
    //          if(i%2!=0){
    //         odd+=a[i];
    //     }
    // }
    cout<<even<<" "<<odd;
}*/

//Ques::Given an array of integers, change the value of all odd indexed elements to its second multiple and increment all even indexed value by 10;
/*#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"enter array size: ";
    cin>>n;
    int a[n];
    int i;
    cout<<"Enter your desired elements : ";
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    for(int i=0; i<n; i++){
        if(i%2!=0){
            a[i]=2*a[i];
        }
        else{
            a[i]+=10;
        }
    }
    for(int i=0; i<n; i++){
        cout<<a[i]<<" ";
    }
    }*/
//Ques::Find the unique number in a given array where all the elemnts are being repeated twice with one value being unique,.

/*#include<iostream>   // i have doubt while running turminal
using namespace std;
int main(){
    int n;
    cout<<"enter array size : ";
    cin>>n;
    int a[n];
    cout<<"Enter your desired elements :";
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    for(int i=0; i<n; i++){
        int count=0;
        for(int j=0; j<n; j++){
            if((i !=j) && a[i]==a[j]){
                count++;
            }
            }
            if(count == 0){
                cout<<a[i]<<endl;
                break;
            }
    }
}*/

//Ques::If an array arr contains n elements n elements, then check if the given array is a palindrome or not.

/*#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"enter your desired array size:";
    cin>>n;
    int a[n];
    cout<<"Enter array's elements:";
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    bool flag=false;
    for(int i=0; i<n; i++){
        // for(int j=n-1; j=0; j--){
            if(a[i]!=a[n-i-1]){
                return false;
            }
             }
}
*/
//by mam
/*#include<iostream>
using namespace std;
bool isPalindrome(int a[], int n){
    for(int i=0; i<n; i++){
        if(a[i]!=a[n-i-1]){
            return false;
        }
    }
            return true;

}
int main(){
    int n;
    cin>>n;
    int a[n];
    for(int i=0; i<n; i++) cin>>a[i];
    cout<<"is thegiven array a palindrome !"<<isPalindrome(a, n);
}*/

                                                                               /*LECTURE_004*/

//Ques::Count the number of triplets whose sum is equal to the  given value x;
//numbers can be repeated but indices must be different.
/*#include<iostream>
using namespace std;
int countTriplets(int a[], int n, int x){
    int count=0;
    for(int i=0; i<n;i++){
        for(int j=i+1; j<n; j++){
            for(int k=j+1; k<n;k++){
                if(a[i]+a[j]+a[k]==x){
                    count++;
                }
            }
        }
    }
    return count;
}
int main(){
    int n;
    cout<<"Enter array's size :";
    cin>>n;
    int a[n];
    cout<<"Enter your desired array's elements: ";
    for(int i=0; i<n; i++){
        cin>>a[i];
    }
    //printing taget no.
    cout<<"enter your triplet'sum :";
    int x;
    cin>>x;
    cout<<countTriplets(a, n, x);
}*/

//Ques::Find the factorial of a large number. Hint:- use an array to store every digit of answer.

#include<iostream>
using namespace std;
int main(){

}


























//Ques::Find the first non-repeating element in the array.

/*#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter array's size :";
    cin>>n;
    int a[n];
    cout<<"enter your array's elements:";
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
    //checking repeating
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            if(i!=j && a[i]==a[j]){
                cout<<"repeating hai bro";
                break;
            }
            else{
                cout<<"not repeating";
            }
        }
    }
}*/

//by mam
/*#include<iostream>
#include<vector>
using namespace std;
void firstNonRepeating(vector<int>a, int n){
    bool flag = false;
    for(int i=0; i<n; i++){
        int j;
        for(j=0;j<n; j++){
            if(i!=j && a[i] == a[j]) break;

        }
        if(j==n){
            cout<<a[i]<<" is the first non-repeating elements."<<endl;
            flag = true;
            break;
        }
    }
    if(!flag) cout<<"there is no non-repeating in array.";
}
int main(){
    int n;
    cin>>n;
    vector<int>a(n);
    for(int i=0; i<n; i++) cin>>a[i];
    firstNonRepeating(a, n);
}*/

//Ques::Move all zeros to the end of the array.[relative ordering must not be disturb.]
/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    int n;
    cin>>n;
    vector<int>a(n);
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
    int j=0;
    for(int i=0; i<n; i++){
        if(a[i]!=0){
            swap(a[i], a[j]);
            j++;
        }
    }
    //changed array
    cout<<"the desired output is:"<<endl;
    for(int i=0;i<n;i++){
        cout<<a[i]<<" ";
    }
}*/









