//Ques::Merge two sorted arrays. [leetcode-88]
/*#include<iostream>
#include<vector>
using namespace std;
vector<int> merge(vector<int> &arr1, vector<int> &arr2){
        int n=arr1.size();
        int m=arr2.size();
        vector<int> res(m+n);
        int i=0; //arr1
        int j=0; //arr2
        int k=0; //res

        while(i<=n-1 && j<=m-1){
            if(arr1[i]<arr2[j]){
                res[k]=arr1[i];
                i++;

            }
            else{  //arr2[j]<arr1[i]
            res[k] = arr2[j];
            j++;
            }
            k++;
        }
        //for remaining elements
        if(i==n){ //arr1 ke sare elements utha chuka hoon
         while(j<=m-1){
            res[k] = arr2[j];
            k++;
            j++;
         }
        }
        if(j==m){ //aaar2 ke sare elements utha chuke hain.
        while(i<=n-1){
            res[k]=arr1[i];
            k++;
            i++;
        }
        }
        return res;
}
int main(){
    // int arr1[4]={1, 4, 5,8};
    vector<int> arr1;
    arr1.push_back(1);
    arr1.push_back(4);
    arr1.push_back(5);
    arr1.push_back(8);
     for(int i=0; i<arr1.size(); i++){
        cout<<arr1[i]<<" ";
    }
    cout<<" ";
    //   int arr2[6]={2, 3, 6, 7, 10, 12};
    vector<int> arr2;
    arr2.push_back(2);
    arr2.push_back(3);
    arr2.push_back(6);
    arr2.push_back(7);
    arr2.push_back(10);
    arr2.push_back(12);
     for(int i=0; i<arr2.size(); i++){
        cout<<arr2[i]<<" ";
    }
    cout<<endl;
    vector<int> v = merge(arr1, arr2);

    for(int i=0; i<v.size(); i++){
        cout<<v[i]<<" ";
    }
}*/

//Ques::Find the next permutation of array. [Leetcode-31]
//Note:-If not possible then print the sorted order in ascending order.


  //pivot idx;
  /*int idx=-1;
  for(int i=n-2; i>=0; i--){
    if(arr[i]<arr[i+1]){
        idx=i;
        break;

    }
  }*/

  //Ques::Trapping Rain water problem on leet code 42






