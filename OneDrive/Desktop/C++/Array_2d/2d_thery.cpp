/*#include<iostream>
using namespace std;
int main(){
    // int arr[3][3];
//  cout<<arr[0][0];
 cout<<endl;
//  arr[0][0]=4;
//  cout<<arr[0][0];

 int arr[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};
 //or
//  int arr[3][3]={1,2,3,4,5,6,7,8,9};
cout<<arr[1][2];

}*/

//TRaversal through 2d array
/*#include<iostream>
using namespace std;
int main(){
 int arr[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};
//  for(int i=0; i<=2; i++){
//     cout<<arr[0][i]<<" ";
//  }
//  cout<<endl;
//  for(int i=0; i<=2; i++){
//     cout<<arr[1][i]<<" ";
//  }
//  cout<<endl;
//   for(int i=0; i<=2; i++){
//     cout<<arr[2][i]<<" ";
//  }
for(int i=0; i<=2; i++){
    for(int j=0; j<=2; j++){
        cout<<arr[i][j]<<" ";
    }
    cout<<endl;
}
}*/

//Taking input
/*#include<iostream>
using namespace std;
int main(){
    int m, n;
    cout<<"Enter the no of rows: ";
    cin>>m;
    cout<<"Enter the no of cols: ";
    cin>>n;
    int arr[m][n];
    for(int i=0; i<=m-1;i++){
        for(int j=0; j<=n-1; j++){
            cin>>arr[i][j];
        }
    }
    //printing array
    for(int i=0; i<=m-1; i++){
        for(int j=0; j<=n-1; j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    }*/

//Ques::Write a program to store roll number and marks obtained by 4 students side by side in amatrix
/*#include<iostream>
using namespace std;
int main(){
    int arr[2][4];
    for(int i=0; i<=1; i++){
        for(int j=0;j<=3;j++){
            cin>>arr[i][j];
        }
    }
     for(int i=0; i<=1; i++){
        for(int j=0;j<=3;j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;

}
}*/

//Ques::Write a c++ program to find the largest element of a given 2d array of integers.
/*#include<iostream>
using namespace std;
#include<climits>
int main(){
    int m,n;
    cout<<"Enter your row size: ";
    cin>>m;
    cout<<"Enter your cols size: ";
    cin>>n;
    int arr[m][n];
    for(int i=0; i<=m-1; i++){
        for(int j=0; j<=n-1; j++){
            cin>>arr[i][j];
        }
    }
    //max
    int max = INT_MIN;
    for(int i=0; i<=m-1; i++){
        for(int j=0; j<=n-1; j++){
            if(max<arr[i][j]) max=arr[i][j];
        }
    }
    cout<<max;
}*/

//Ques::WAP to print sum of all the elements of a 2d matrix.
/*#include<iostream>
using namespace std;
int main(){
    int m,n;
    cout<<"Enter your row size: ";
    cin>>m;
    cout<<"Enter your cols size: ";
    cin>>n;
    int arr[m][n];
    //input
    for(int i=0; i<=m-1; i++){
        for(int j=0; j<=n-1; j++){
            cin>>arr[i][j];
        }
    }
    //working
    int sum=0;
    for(int i=0;i<=m-1; i++){
        for(int j=0; j<=n-1; j++){
            sum+=arr[i][j];

        }
        // cout<<sum;
        // cout<<endl;


    }
                cout<<sum;

}*/

//Ques::WAP to add two matrices.
/*#include<iostream>
using namespace std;
int main(){
    int arr1[2][3]={1,2,3,4,5,6};
    int arr2[2][3]={0,1,2,3,5,8};

    for(int i=0; i<2; i++){
        for(int j=0; j<3; j++){
            cout<<arr1[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
    for(int i=0; i<2; i++){
        for(int j=0; j<3; j++){
            cout<<arr2[i][j]<<" ";
        }
        cout<<endl;
    }
    for(int i=0; i<2; i++){
        for(int j=0; j<3; j++){
            arr2[i][j]+=arr1[i][j];
        }
        cout<<endl;
    }
    for(int i=0; i<2; i++){
        for(int j=0; j<3; j++){
            cout<<arr2[i][j]<<" ";
        }
        cout<<endl;
    }
    /*int res[2][3];
    for(int i=0;i<2;i++){
        for(int j=0; j<3; j++){
            res[i][j]=arr1[i][j]+arr2[i][j];
    }

    }
    for(int i=0; i<2; i++){
        for(int j=0; j<3; j++){
            cout<<res[i][j]<<" ";
        }
        cout<<endl;
    }*/
// }*/
//Ques::WAP to print the transpose of the matrix entered by the users and store it in a new matrix.

/*#include<iostream>
using namespace std;
int main(){
    int m,n;
    cout<<"Enter your row size: ";
    cin>>m;
    cout<<"Enter your cols size: ";
    cin>>n;
    int arr[m][n];

    for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cin>>arr[i][j];
        }
    }
      for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
    //printing transpose (means colom wise printingg)
    for(int j=0; j<n; j++){
        for(int i=0; i<m; i++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
}*/

//store transpose of matrix in new matrix

/*#include<iostream>
using namespace std;
int main(){
    int m,n;
    cout<<"Enter your row size: ";
    cin>>m;
    cout<<"Enter your cols size: ";
    cin>>n;
    int arr[m][n];

    for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cin>>arr[i][j];
        }
    }
      for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
    //printing transpose (means colom wise printingg)
    for(int j=0; j<n; j++){
        for(int i=0; i<m; i++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
        //store the transpose of  this new matrix
        int t[n][m];
        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                t[i][j]=arr[j][i];
            }
        }
        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
               cout<<t[i][j]<<" ";
            }
            cout<<endl;
        }

    }*/
//Ques::WAP to change the given matrix with its transpose.[leetcode 867]
//Ques::you are given a matrix /2d array of size (n*n). Transpose this matrix into its transpose
/*#include<iostream>
using namespace std;
int main(){
    int m;
    cout<<"Enter you row size: ";
    cin>>m;
    cout<<"Enter your colmn size: ";
    cin>>m;
    int arr[m][m];
    //taking input in matrix
    for(int i=0; i<m; i++){
        for(int j=0; j<m; j++){
            cin>>arr[i][j];
        }
        cout<<endl;
    }
    cout<<endl;
    //printing array
    for(int i=0; i<m; i++){
        for(int j=0; j<m; j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
        }
    cout<<endl;
    //transpose in same matrix
    for(int i=0;i<m; i++){
        for(int j=i+1; j<m; j++){
            //swapping of i, j and j, i;
            int temp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;
        }
    }
    //print
    for(int i=0; i<m; i++){
        for(int j=0; j<m; j++){
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
    }*/

    // Ques::WAP to rotate the matrix by 90 degrees clockwise.[leetcode 48]

//Ques::WAP to program to print the multiplication of two  matrices given by user.

/*#include<iostream>
using namespace std;
int main(){
    int m;
    cout<<"Enter rows of 1st matrix : ";
    cin>>m;
    int n;
    cout<<"Enter cols of 1st matrix : ";
    cin>>n;
    int p;
    cout<<"Enter rows of 2nd matrix : ";
    cin>>p;
    int q;
    cout<<"Enter cols of 2nd matrix : ";
    cin>>q;
    if(n==p){
        int a[m][n];
        cout<<"Enter elements of 1st matrix: ";
        for(int i=0; i<m; i++){
            for(int j=0; j<n; j++){
                cin>>a[i][j];
            }
        }
        cout<<" Enter your seomd matrix: ";
        int b[p][q];
        for(int i=0; i<p; i++){
            for(int j=0; j<q; j++){
                cin>>b[i][j];
            }
        }
        //resultant matrix
        int res[m][q];
        for(int i=0; i<m; i++){
            for(int j=0; j<q; j++){
                //multiply
                //res[i][j] = a[i][0]*b[0][j] + a[i][1]*b[1][j] +
                res[i][j]=0;
                for(int k=0; k<p; k++){
                    res[i][j] += a[i][k] * b[k][j];
                }
            }
        }
         for(int i=0; i<m; i++){
            for(int j=0; j<q; j++){
             cout<<res[i][j]<<" ";
            }
            cout<<endl;
         }
         cout<<endl;

    }
    else{
        cout<<"The matrices cannot be multiplied";
    }
}*/

//Ques::WAP to print the matrix in wave form.
/*#include<iostream>
using namespace std;
int main(){
    int m, n;
    cout<<"Enter your row size: ";
    cin>>m;
    cout<<"Enter your cols size: ";
    cin>>n;
    int arr[m][n];
        //Printing In "S" like shape
        for(int i=0; i<m; i++){
            for(int j=0; j<n; j++){
                cin>>arr[i][j];
            }

        // cout<<endl;
        }
        /*for(int i=0; i<m; i++){
            if(i%2==0){
                for(int j=n-1; j>=0; j--){
                    cout<<arr[i][j]<<" ";
                }
                cout<<endl;
            }
            else{
                for(int j=0;j<n; j++){
                    cout<<arr[i][j]<<" ";
                }
                cout<<endl;
            }

        }*/

        //now print "S" in reverse ordering
        /*for(int i=m-1; i>=0; i--){
            if(i%2==0){
            for(int j=0; j<n; j++){
                cout<<arr[i][j]<<" ";
            }
        }
        else{
            for(int j=n-1; j>=0; j--){
                cout<<arr[i][j]<<" ";
            }
        }
        }*/



    /*for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cin>>arr[i][j];
        }
    }
    cout<<endl;
                                          // //wave print
    for(int i=0; i<m; i++){
        if(i%2==0){
        for(int j=0; j<n; j++){
            cout<<arr[i][j]<<" ";
        }
        }
        else{
            // i = 1,3,5.....odd
            for(int j=n-1; j>=0; j--){
                cout<<arr[i][j]<<" ";
            }

        }
        // cout<<endl;
    }*/

    //column wise printing
    // for(int j=0; j<n; j++){
    //     for(int i=0; i<m; i++){
    //         cout<<arr[i][j]<<" ";
    //     }
    // }

// }*/

//Ques::WAP to print the matrix in spiral form.[leetcode 54]

#include<iostream>
using namespace std;
int main(){
    int m;
    cout<<"Enter your row size of matrix: ";
    cin>>m;
    int n;
    cout<<"Enter your col size of matrix: ";
    cin>>n;
    int arr[m][n];
    //taking input in array
    for(int i=0; i<m; i++){
        for(int j=0; j<n; j++){
            cin>>arr[i][j];
        }
    }
    cout<<endl;
    //working of spiral printing
    int minr = 0, minc=0;
    int maxr=m-1, maxc=n-1;
    while(minr<=maxr && minc<=maxc){
        //right side
        for(int j=minc; j<=maxc; j++){
            cout<<arr[minr][j]<<" ";
        }
        minr++;
        if(minr>maxr || minc>maxc) break;
        //down
        for(int i=minr; i<=maxr;i++){
            cout<<arr[i][maxc]<<" ";
        }
        maxc--;
         if(minr>maxr || minc>maxc) break;

        //left
        for(int j=maxc; j>=minc;j--){
            cout<<arr[maxr][j]<<" ";
        }
        maxr--;
        if(minr>maxr || minc>maxc) break;
        //up
        for(int i=maxr; i>=minr; i--){
            cout<<arr[i][minc]<<" ";
        }
        minc++;
        //  if(minr>maxr || minc>maxc) break;
        }
}



