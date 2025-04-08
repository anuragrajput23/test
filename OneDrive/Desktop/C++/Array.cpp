//Syntax And Declaration
// #include <iostream>
// using namespace std;
// int main()
// {
    // int arr[7]; // 0 1 2 34 5 6
//     int arr[7]={1,2,3,4,5,6,8};
//     // arr[0] = 10;
//     // arr[1] = 2;
//     // arr[2] = 10;
//     // arr[3] = 10;
//     // arr[4] = 10;
//     // arr[5] = 10;
//     // arr[6]=10;
// for(int i=0; i<7; i++){
//     cout<<arr[i]<<" ";
// }
 //   // cout << arr[6];
// }

//taking inputs using loop
// #include<iostream>
// using namespace std;
// int main(){
//     int arr[5];
//     //input
//     for(int i=0; i<=4; i++){
//         cin>>arr[i];
//     }
//     //output
//     for(int i=0; i<=4; i++){
//         cout<<arr[i]<<" ";
//     }
// }
// #include<iostream>
// using namespace std;
// int main(){
//     int arr[7];
//     cin>>arr[0];
//     cin>>arr[1];
//     for(int i=0; i<=6; i++){
//         cout<<arr[i]<<" ";
//     }

// }

//ques::Given an array of marks of students, if the marks of any student is less thaaan 35 print its roll number.
//[roll number here refers to the index of the array.]

/*#include<iostream>
using namespace std;
int main(){
    int marks[]={20,35,82,75,29};
    for(int i=0; i<=4; i++){
        if(marks[i]<35){
            cout<<marks[i]<<" ";
        }
    }
}*/
/*#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter no of students : ";
    cin>>n;
    int marks[n];
    cout<<"Enter the marks : ";
    //input
    for(int i=0; i<=n-1; i++){
        cin>>marks[i];
    }
    //output
    for(int i=0; i<=n-1; i++){
        if(marks[i]<35){
            cout<<i<<" ";
        }
    }
}*/

//size and sizeof operator
/*#include<iostream>
using namespace std;
int main(){
    int arr[] = {1,2,3,4,5,6,7,8};
    int size = sizeof(arr)/sizeof(arr[0]);
    cout<<size;
}*/

/*Continuous Memory Allocation*/
/*#include<iostream>
using namespace std;
int main(){
    int arr[5];
    cout<<&arr[0]<<" ";
    cout<<&arr[1]<<" ";
    cout<<&arr[2]<<" ";
    cout<<&arr[3]<<" ";
    cout<<&arr[4]<<" ";
    cout<<arr<<" ";
    cout<<&arr;
    }*/

    /*Calculate the sum of all the elements in the given array*/
    /*#include<iostream>
    using namespace std;
    int main(){
        int sum = 0;
        int n;
        cout<<"Enter the value of n : ";
        cin>>n;
        int arr[n];
        //input
        for(int i=0; i<=n-1; i++){
            cin>>arr[i];
        }
        //output
        for(int i=0; i<=n-1; i++){
            sum+=arr[i];

        }
        cout<<sum;
    }*/
    /*Linear Search*/
    /*#include<iostream>
    using namespace std;
    int main(){
        int found=0;
        int key=12;
        int arr[]={20,12,30,25,45,12};
        //check
        for(int i=0; i<6; i++){
            if(key==arr[i]){
                cout<<"found at index : "<< i <<endl;
                found=1;
            }
            }
         if(found==0){
                cout<<"not found";
            }
    }*/

/*#include<iostream>
using namespace std;
int main(){
    int found=0;
    int n;
    cout<<"Enter array size:";
    cin>>n;
        int arr[n];

     int key;
    cout<<"Enter the desired value: ";
    cin>>key;
    // int arr[n];
    //input
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    //search

    for(int i=0; i<n; i++){
        if(key==arr[i]){
            cout<<"Yes, your key has founded at: "<<i<<"ith"<<endl;
            found=1;
        }
    }
    if(found==0){
        cout<<"No, not found";
    }
}*/

/*#include<iostream>
using namespace std;
int main(){
    int found=0;
    int n;
    cout<<"Enter array size:";
    cin>>n;
        int arr[n];
    // int arr[n];
    //input
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    //search
 int key;
    cout<<"Enter the desired value: ";
    cin>>key;
    for(int i=0; i<n; i++){
        if(key==arr[i]){
            cout<<"Yes, your key has founded at: "<<i<<"ith"<<endl;
            found=1;
        }
    }
    if(found==0){
        cout<<"No, not found";
    }
}*/

/*#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter size of array :";
    cin>>n;
    int arr[n];
    //input
    for(int i=0; i<n; i++){
        cin>>arr[i];
    }
    int X;
    cout<<"Enter your desired key : ";
    cin>>X;
    //search
    //check mark
    bool flag = false; //false -> not present
    for(int i=0; i<n; i++){
        if(arr[i]==X){
            // cout<<"Present";
            flag = true;
        }
    }
        if(flag==true){
            cout<<"element is present";
        }
        else{
            cout<<"not present";
        }
    }*/

//Find Maximum Value in an array
/*#include<iostream>
#include<climits>
using namespace std;
int main(){

    int arr[]={1,5,8,10,45};
    // int max=arr[0];
    int max = INT_MIN;
    for(int i=0; i<5; i++){
        if(max<arr[i])
            max=arr[i];
             }
             cout<<m;
}*/

/*Finding Second Maxm*/
/*#include<iostream>
#include<climits>
using namespace std;
int main(){
    int n;
    cout<<"Enter array size : ";
    cin>>n;
    int arr[n];
    //input
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    //Finding Max
    int max=INT_MIN;
    for(int i=0;i<n;i++){
        if(max<arr[i]){
            max=arr[i];
        }
    }
    int smax=INT_MIN;
    for(int i=0; i<n; i++){
        if(smax<arr[i] && arr[i]!=max)
            smax=arr[i];

    }
    cout<<smax<<endl;
    cout<<max;
}*/

/*Count All greater Nos.*/
/*#include<iostream>
using namespace std;
int main(){
    int count=0;
    int n;
    cout<<"Enter array size : ";
    cin>>n;
    int arr[n];
    for(int i=0;i<n;i++){
        cin>>arr[i];

    }
    for(int i=0;i<n;i++){
        if(arr[i]>5){
            count++;
        }
    }
    cout<<count;
}*/

/*Finding Product of an Array*/
/*#include<iostream>
using namespace std;
int main(){
    int Product=1;
    int n;
    cout<<"Enter size of  array :";
    cin>>n;
    int arr[n];
    //input
    for(int i=0; i<n; i++){
        cin>>arr[i];
    }
    //Product
    for(int i=0; i<n; i++){
        // Product=Product*arr[i];
        Product*=arr[i];
    }
    cout<<Product;
}*/

/*Pasing Arry To Function*/
/*#include<iostream>
using namespace std;
void display(int a[], int size){
    for(int i=0; i<size; i++){
        cout<<a[i]<<" ";
    }
    cout<<endl;
    return;

}
void change(int b[], int size){
    b[0]=100;
}
int main(){
    int arr[5]={1,4,2,7,4};
    int size = sizeof(arr)/sizeof(arr[0]);
    //accessing the elements of array in another function
    //updation, pass by value / reference ?
    display(arr,size);
    change(arr,size);
    display(arr,size);
    }*/

/*Arrays And Pointers*/
////Pointer can access entire Array

/*
int arr[] = {1, 5, 2, 3, 4};
int* ptr = arr;
int* ptr = &arr;              //ye galat hai....
int* ptr = &arr[0];
int * ptr = arr[0];      //ye bhi galat hai

int x=4;
int* ptr = &x;
int *ptr =x;  // ye galat hai....!!
*/

/*#include<iostream>
using namespace std;
int main(){
    int arr[] ={4,2,8,9,85};
    int * ptr =arr;  //giving address
    // cout<<ptr<<endl;

    // for(int i=0; i<5; i++){
    //     cout<<ptr[i]<<" ";
    // }
    // cout<<endl;
    // //*ptr = 8;      //   ptr[0] = 8;
    for(int i=0; i<5; i++){
        cout<<*ptr<<" ";
        ptr++;
    }
    cout<<endl;
    ptr=arr;   //ptr pinting to 1st element
    //cout<<ptr<<endl;
    //for(int i=0; i<5; i++){
        //cout<<ptr[i]<<" ";
        //}
        //cout<<endl;
        *ptr = 8;
        ptr++;  //ptr is pointing to 2nd element
        *ptr = 9;
        ptr--;  //ptr is pointing to 1st element
        for(int i=0; i<5; i++){
            cout<<*ptr<<" ";  //OR cout<<i[arr]<<" ";
            ptr++;
        }
        ptr = arr; //ptr is pointing to 1st element

    }*/


                                                                                 /*Vector in C++*/    /*Array ki replacement*/


/*Vector is a dynamic array*/

/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;   //you need not mention the size
    //inserting / input do not use []
    v.push_back(6);
    v.push_back(1);
    v.push_back(9);
    v.push_back(0);
    //if you want to update / access
    v[0]= 55;
    cout<<v[0]<<" ";
    cout<<v[1]<<" ";
    cout<<v[2]<<" ";
    cout<<v[3]<<" ";
    // cout<<v[4]<<" ";
}*/


/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;   //you need not mention the size
    //inserting / input do not use []
    v.push_back(6);
    // cout<<v.size()<<" ";
    cout<<v.capacity()<<" ";
    v.push_back(1);
        // cout<<v.size()<<" ";
            cout<<v.capacity()<<" ";


    v.push_back(9);
        // cout<<v.size()<<" ";
            cout<<v.capacity()<<" ";


    v.push_back(0);
        cout<<v.capacity()<<" ";

    //if you want to update / access
    // v[0]= 55;
    // cout<<v[0]<<" ";
    // cout<<v[1]<<" ";
    // cout<<v[2]<<" ";
    // cout<<v[3]<<" ";
    // cout<<v[4]<<" ";
}*/

/*Operations Of Vectors*/
/*
#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;
    v.push_back(6);
    v.push_back(1);
    v.push_back(9);
    v.push_back(10);
    v.push_back(10);
    v.push_back(10);
    v.push_back(10);
    v.push_back(10);
    v.push_back(10);
    v.push_back(10);
    v.push_back(13);
    cout<<"size is : "<<v.size()<<endl;
    cout<<"capacity is : "<<v.capacity()<<endl;
    v.pop_back();
    v.pop_back();
    v.pop_back();
    v.pop_back();
    v.pop_back();
    v.pop_back();
     cout<<"size is : "<<v.size()<<endl;
    cout<<"capacity is : "<<v.capacity()<<endl;
    // cout<<v[0]<<" "<<v[10];
  /*  for(int i=0; i<v.size();i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;
    v.pop_back();
    v.pop_back();
    for(int i=0; i<v.size();i++){
        cout<<v[i]<<" ";
    }*/


/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    // vector<int> v(5);
    /*vector<int> v(5,7); //initial size = 5, each lement 7;
    cout<<v.size()<<endl;
    cout<<v[0]; */

   /* vector<int> v(5);
    for(int i=0; i<5;i++){
        cin>>v[i];
    }
    for(int i=0; i<5; i++){
        cout<<v[i]<<" ";
    }
}*/
/*
#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;
    v.push_back(3);
    v.push_back(1);
    v.push_back(2);
    v.push_back(6);
    v.push_back(9);

    for(int i=0; i<5; i++){
        cout<<v[i]<<" ";
    }
}*/

/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;
    for(int i=0;i<5;i++){
        int x;
        cin>>x;
        v.push_back(x);
    }
    for(int i=0 ;i<5; i++){
        cout<<v[i]<<" ";
    }
}*/

/*Vector At Sort*/
/*#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
int main(){
    vector<int> v;
    v.push_back(9);
    v.push_back(10);
    v.push_back(6);
    v.push_back(1);
    // cout<<v.at(2);  OR
    // cout<<v[2]
    // v.at(2) = 90;
    // cout<<v.at(2);
    for(int i=0; i<v.size(); i++){
        cout<<v.at(i)<<" ";
    }
    cout<<endl;
    //sort
    sort(v.begin(),v.end());
    for(int i=0; i<v.size(); i++){
        cout<<v.at(i)<<" ";
    }
}*/                                                                 /*Passing Vector in Function*/
/*vectors are passed by value */
/*Each time you pass, new vector*/
/*#include<iostream>
#include<vector>
using namespace std;
void change(vector<int> &a){
    a[2]=100;
    // for(int i=0; i<a.size(); i++){
    //     cout<<a[i]<<" ";
    // }
    // cout<<endl;
}
int main(){
    vector<int> v;
    v.push_back(9);
    v.push_back(10);
    v.push_back(6);
    v.push_back(1);
    for(int i=0; i<v.size();i++){
        cout<<v[i]<<" ";
        // cout<<v.at(i)<<" ";
    }
    cout<<endl;
    change(v);
    for(int i=0; i<v.size();i++){
        cout<<v[i]<<" ";
}
}*/

/*Looping in Vector*/
/*Ques. :: Find the last occurence of x in the array*/
/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;
    v.push_back(9);
    v.push_back(10);
    v.push_back(6);
    v.push_back(12);
    v.push_back(11);
    v.push_back(6);
    v.push_back(0);
    int x = 6;
    int idx = -1;
    for(int i=0; i<v.size(); i++){
        if(v[i]==x) {
            idx=i;
            // break;
        }
    }
    // for(int i=v.size()-1; i>=0; i--){
    //     if(v[i]==x){
    //         idx=i;
    //         break;
    //     }
    // }
    cout<<idx;
}*/

// Ques::Find the doublet in the Array whose sum is equal to the given value x.[LeetCode Problem]
/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    int x;
    cout<<"Enter target : ";
    cin>>x;
    vector<int> v;
    int n;
    cout<<"Enter array/vector size : ";
    cin>>n;
    cout<<"Eneter array elements : ";
    for(int i=0; i<n; i++){
        int q;
        cin>>q;
        v.push_back(q);
        }
        for(int i=0; i<=v.size()-2; i++){
            for(int j=i+1; j<=v.size()-1; j++){
                if(v[i]+v[j]==x){
                    cout<<"("<<i<<","<<j<<")"<<endl;
                }
            }
        }
}*/

// Ques::Write a program to copy the contents of one array into another in the reverse order.
/*#include<iostream>
#include<vector>
using namespace std;
 void display(vector<int> &a){
        for(int i=0; i<a.size();i++){
            cout<<a[i]<<" ";
        }
        cout<<endl;
    }
int main(){
    vector<int> v1;
    v1.push_back(1);
    v1.push_back(6);
    v1.push_back(2);
    v1.push_back(3);
    v1.push_back(7);
    v1.push_back(4);
    display(v1);

    vector<int> v2(v1.size());
    for(int i=0; i<v2.size(); i++){  //v1.size() OR v2.size() both are same
        //i+j=size-1
        int j = v1.size()-1-i;
        v2[i]=v1[j];
    }
    display(v2);
    }*/
                               /*Two Pointers*/
/*Ques::Write a program to reverse to the reverse the array without using any extra array*/
/*#include<iostream>
#include<vector>
using namespace std;
void display(vector<int> &b){
    for(int i=0; i<b.size(); i++){
        cout<<b[i]<<" ";
    }
    cout<<endl;
}
int main(){
    vector<int> v1;
    v1.push_back(1);
    v1.push_back(6);
    v1.push_back(3);
    v1.push_back(7);
    v1.push_back(4);
    display(v1);
    //reverse using two pinters.
    // int i=0;
    // int j=v1.size()-1;
    // while(i<=j){
    //     //swap v[i] and v[j]
    //     int temp = v1[i];
    //     v1[i]=v1[j];
    //     v1[j]=temp;
    //     i++;
    //     j--;
// }
        for(int i=0, j=v1.size()-1; i<=j; i++ ,j--){
            int temp;
            temp=v1[i];
            v1[i]=v1[j];
            v1[j]=temp;
            }
    display(v1);

    }*/


/*#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
 void display(vector<int> a){
    for(int i=0; i<a.size();i++){
    cout<<a[i]<<" ";
    }
    cout<<endl;
}
void reversePart(int i, int j, vector<int> &v){
    while(i<=j){
        int temp=v[i];
        v[i]=v[j];
        v[j]=temp;
        i++;
        j--;

    }
    return;
}
void reverse(vector<int> &v){
    int i=0;
    int j=v.size()-1;
    while(i<=j){
        int temp=v[i];
        v[i]=v[j];
        v[j]=temp;
        i++;
        j--;
    }
}

int main(){
    vector<int> v;
    v.push_back(1);
    v.push_back(6);
    v.push_back(3);
    v.push_back(7);
    v.push_back(4);
   display(v);
//    reverse(v.begin(), v.end());
//    display(v);
//    reversePart(0,2,v);
//    display(v);

   reverse(v);
   display(v);
}*/

// Ques:: Rotate the given array 'a'by K steps, where K is non-negative.
/*Note::K can be the greater than n as well where n is the size of array 'a'.*/

//Process::for k=2
//0 1 2 3 4 5 6  //indices
//1 6 2 3 7  ||  4 8   //break last two elements
//7 3 2 6 1 8 4
//4 8 1 6 2 3 7 Answer.
//Step1:: reversePart(0,n-k-1,v);
//reversePart(n-k, n-1,v);
//reversePart(0,n-1,v);

/*#include<iostream>
#include<vector>
using namespace std;
void display(vector<int> &a){
    for(int i=0; i<a.size(); i++){
        cout<<a[i]<<" ";
    }
    cout<<endl;
}
void reversePart(int i, int j, vector<int> &v){
    while(i<=j){
        int temp=v[i];
        v[i]=v[j];
        v[j]=temp;
        i++;
        j--;
    }
    // cout<<endl;
}
int main(){
    vector<int> v;   //1 6 8 7 11 13
    v.push_back(1);
    v.push_back(6);
    v.push_back(8);
    v.push_back(7);
    v.push_back(11);
    v.push_back(13);
    display(v);
    int k=3;
    //Rotate
    int n=v.size();
    // if(k>n) k= k-n;
    if(k>n) k=k%n;
/*if(k>n) then k=k%n */
    /*reversePart(0,n-k-1,v);
    reversePart(n-k,n-1,v);
    reversePart(0,n-1,v);
    display(v);
}*/






































































































