//Ques::Sort the array of 0's and 1's.
/*#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
int main(){
    vector<int> v;
    v.push_back(0);
    v.push_back(1);
    v.push_back(0);
    v.push_back(0);
    v.push_back(1);
    for(int i=0; i<v.size(); i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;
    sort(v.begin(), v.end());

    //print after sorting
    for(int i=0;i<v.size();i++){
        cout<<v[i]<<" ";
    }
}*/
                                            //    Method_01 by going through array at one pass
/*#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
void sort01method_1(vector<int>& v){
    int n=v.size();
    int noo =0;
    int noz=0;
    for(int i=0;i<n; i++){
        if(v[i]==0){
            noz++;
        }
        else{
            noo++;
        }
    }
    //filing elements
    for(int i=0; i<n; i++){
        if(i<noz){
            v[i]=0;
        }
        else{
            v[i]=1;
        }
    }

}
void sort01method_2(vector<int> &v){
    int n= v.size();
    int i=0;
    int j=n-1;
    while(i<j){
        if(v[i]==0) i++;
        if(v[j]==1) j--;
        if(i>j) break;
        if(v[i]==1 && v[j]==0){
            v[i]=0;
            v[j]=1;
            i++;
            j--;
        }
    }
}*/
/*int main(){
    vector<int> v;
    v.push_back(1);
    v.push_back(1);
    v.push_back(0);
    v.push_back(1);
    v.push_back(0);
    v.push_back(1);
    v.push_back(1);
    v.push_back(0);
    // v.push_back(1);
    // v.push_back(0);
    // v.push_back(1);
    // sort01method_1(v);
    // for(int i=0; i<v.size(); i++){
    //     cout<<v[i]<<" ";
    // }
cout<<endl;
    sort01method_2(v);
    for(int i=0; i<v.size(); i++){
        cout<<v[i]<<" ";
    }

}*/
                                                              /*Method-02 by using Two pointers*/
/*#include<iostream>
#include<vector>
using namespace std;
int main(){
    vector<int> v;
    v.push_back(0);
    v.push_back(0);
    v.push_back(1);
    v.push_back(0);
    v.push_back(1);
    v.push_back(0);
    v.push_back(1);
    for(int i=0; i<v.size(); i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;
    //working
    int n=v.size();
    int i=0;
    int j=n-1;
    while(i<j){
        if(v[j]==1){
            j--;
        }
        if(v[i]==0){
            i++;
        }
        if(v[i]==1 && v[j]==0){
            swap(v[i],v[j]);
            i++;
            j--;
        }

    }
    for(int i=0; i<n; i++){
        cout<<v[i]<<" ";
    }
}*/

// Ques::Move all negative numbers to beginning and positive to end with constant extra space.
//Ques::Sort the array of 0's, 1's and 2's [leetcode-75]
//and now solve above question by using 3 pointer algorithm (dutch flag algorithm)

//Ques::Merge two sorted arrays. [leetcode-88]




