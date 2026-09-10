using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using SchoolERP_System.Models;
using SchoolERP_System.Helper;
using System.IO;
using System.Configuration;

namespace SchoolERP_System.Controllers
{
    [SessionAuthorizedAttribute]
    public class LibraryController : Controller
    {
        private string CurrentUserID
        {
            get { return ((loggedInAdmin)System.Web.HttpContext.Current.Session["loggedInAdmin"]).UserID; }
        }

        #region BookCategory
        public ActionResult CategoryList()
        {
            return View();
        }
        public ActionResult saveLibBookCategory(string Id, string CategoryName, string ShelfNo, string Remarks)
        {
            try
            {
                string Type = "";
                if (Id == "" || Id == "0")
                    Type = "Insert";
                else
                    Type = "Update";
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("CategoryID", Id),
                    new SqlParameter("CategoryName", CategoryName),
                    new SqlParameter("ShelfNo", ShelfNo),
                    new SqlParameter("Remarks", Remarks)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibBookCategory", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewLibBookCategory(string Id, string Type)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("CategoryID", Id),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibBookCategory", prm1, CommandType.StoredProcedure);
                List<BookCategory> list = Utility.ConvertDataTableToClassObjectList<BookCategory>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteLibBookCategory(string Id)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Delete"),
                    new SqlParameter("CategoryID", Id)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibBookCategory", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region BookList
        public ActionResult BookList()
        {
            SqlParameter[] prm1 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.CategoryList = Utility.GetDropDownList("SP_LibBookCategory", "CategoryID", "CategoryName", prm1, "", "", "Select");
            return View();
        }
        public ActionResult saveBookListMaster(string Id, string CategoryID, string BookName, string BookAuthor, string Publisher,
                                               string Edition, string ISBN, string Pages, string Price, string PurchaseDate,
                                               string RackNo, string Shelf, string Stock)
        {
            try
            {
                string Type = "";
                if (Id == "" || Id == "0")
                    Type = "Insert";
                else
                    Type = "Update";
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("BookID", Id),
                    new SqlParameter("CategoryID", CategoryID),
                    new SqlParameter("BookName", BookName),
                    new SqlParameter("BookAuthor", BookAuthor),
                    new SqlParameter("Publisher", Publisher),
                    new SqlParameter("Edition", Edition),
                    new SqlParameter("ISBN", ISBN),
                    new SqlParameter("Pages", Pages),
                    new SqlParameter("Price", Price),
                    new SqlParameter("PurchaseDate", PurchaseDate),
                    new SqlParameter("RackNo", RackNo),
                    new SqlParameter("Shelf", Shelf),
                    new SqlParameter("TotalStock", Stock)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibBook", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewBookListMaster(string Id, string Type)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("BookID", Id),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibBook", prm1, CommandType.StoredProcedure);
                List<Book> list = Utility.ConvertDataTableToClassObjectList<Book>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteBookListMaster(string Id)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Delete"),
                    new SqlParameter("BookID", Id)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibBook", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Member
        public ActionResult MemberList()
        {
            SqlParameter[] prm1 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.ClassList = Utility.GetDropDownList("SP_Class", "ClassID", "ClassName", prm1, "", "", "Select");
            SqlParameter[] prm2 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.StaffList = Utility.GetDropDownList("SP_Employee", "EM_EmpId", "EM_EmpName", prm2, "", "", "Select");
            return View();
        }
        public ActionResult saveLibMember(string Id, string MemberType, string MemberRefID, string RegNo, string MemberName,
                                          string ClassID, string SectionID, string Gender, string ContactNo)
        {
            try
            {
                string Type = "";
                if (Id == "" || Id == "0")
                    Type = "Insert";
                else
                    Type = "Update";
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("LibMemberID", Id),
                    new SqlParameter("MemberType", MemberType),
                    new SqlParameter("MemberRefID", MemberRefID),
                    new SqlParameter("RegNo", RegNo),
                    new SqlParameter("MemberName", MemberName),
                    new SqlParameter("ClassID", ClassID),
                    new SqlParameter("SectionID", SectionID),
                    new SqlParameter("Gender", Gender),
                    new SqlParameter("ContactNo", ContactNo)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibMember", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewLibMember(string Id, string Type)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("LibMemberID", Id),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibMember", prm1, CommandType.StoredProcedure);
                List<LibMember> list = Utility.ConvertDataTableToClassObjectList<LibMember>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteLibMember(string Id)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Delete"),
                    new SqlParameter("LibMemberID", Id)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibMember", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult BindStudent(string CID, string SID)
        {
            try
            {
                string Type = "SelectStudent";
                if (string.IsNullOrWhiteSpace(CID) || CID == "0")
                    Type = "SelectStudentByID";
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("CID", CID),
                    new SqlParameter("SID", SID),
                    new SqlParameter("SearchID", SID)
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibMember", prm1, CommandType.StoredProcedure);
                List<SR> list = Utility.ConvertDataTableToClassObjectList<SR>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult BindMember(string CID, string SID, string MemberType)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "BindMember"),
                    new SqlParameter("CID", CID),
                    new SqlParameter("SID", SID),
                    new SqlParameter("MemberType", MemberType)
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibMember", prm1, CommandType.StoredProcedure);
                List<LibMember> list = Utility.ConvertDataTableToClassObjectList<LibMember>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region BookIssue
        public ActionResult BookIssue()
        {
            SqlParameter[] prm1 = new SqlParameter[] {
                  new SqlParameter("Type", "SelectForIssue"),
            };
            ViewBag.BookList = Utility.GetDropDownList("SP_LibBook", "BookID", "BookName", prm1, "", "", "Select");
            SqlParameter[] prm2 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.ClassList = Utility.GetDropDownList("SP_Class", "ClassID", "ClassName", prm2, "", "", "Select");
            SqlParameter[] prm3 = new SqlParameter[] {
                  new SqlParameter("Type", "BindMember"),
            };
            ViewBag.MemberList = Utility.GetDropDownList("SP_LibMember", "LibMemberID", "MemberName", prm3, "", "", "Select");
            return View();
        }
        public ActionResult getLibrarySetting()
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Select")
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibSetting", prm1, CommandType.StoredProcedure);
                List<LibrarySetting> list = Utility.ConvertDataTableToClassObjectList<LibrarySetting>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewClassList()
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Select"),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_Class", prm1, CommandType.StoredProcedure);
                List<SR> list = Utility.ConvertDataTableToClassObjectList<SR>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult saveBookIssueMaster(string Id, string IssueDate, string DueDate, string LibMemberID, string BookID)
        {
            try
            {
                string Type = "";
                if (Id == "" || Id == "0")
                    Type = "Save";
                else
                    Type = "Update";
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("IssueID", Id),
                    new SqlParameter("IssueDate", IssueDate),
                    new SqlParameter("DueDate", DueDate),
                    new SqlParameter("LibMemberID", LibMemberID),
                    new SqlParameter("BookID", BookID),
                    new SqlParameter("IssuedBy", CurrentUserID)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibIssue", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewBookIssueMaster(string Id, string Type, string SearchID)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", Type),
                    new SqlParameter("IssueID", Id),
                    new SqlParameter("SearchID", SearchID)
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibIssue", prm1, CommandType.StoredProcedure);
                List<IssueBook> list = Utility.ConvertDataTableToClassObjectList<IssueBook>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteBookIssueMaster(string Id, string type, string FinePaidStatus, string Remarks)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", type),
                    new SqlParameter("IssueID", Id),
                    new SqlParameter("FinePaidStatus", FinePaidStatus),
                    new SqlParameter("Remarks", Remarks),
                    new SqlParameter("ReturnedBy", CurrentUserID)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibIssue", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Student
        public ActionResult BookManger()
        {
            ViewBag.StudentID = GetLoggedInStudentID();
            return View();
        }
        public ActionResult BookRetrun()
        {
            ViewBag.StudentID = GetLoggedInStudentID();
            return View();
        }
        private string GetLoggedInStudentID()
        {
            try
            {
                if (((loggedInAdmin)System.Web.HttpContext.Current.Session["loggedInAdmin"]).userType == "Student")
                    return ((loggedInAdmin)System.Web.HttpContext.Current.Session["loggedInAdmin"]).SR_ID;
                else if (((loggedInAdmin)System.Web.HttpContext.Current.Session["loggedInAdmin"]).userType == "Parents")
                    return ((loggedInParents)System.Web.HttpContext.Current.Session["loggedInParents"]).StudentID;
            }
            catch (Exception ex) { }
            return "";
        }
        #endregion

        #region Reports
        public ActionResult ReportIssue()
        {
            return View();
        }
        public ActionResult ReportOverdue()
        {
            SqlParameter[] prm1 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.CategoryList = Utility.GetDropDownList("SP_LibBookCategory", "CategoryID", "CategoryName", prm1, "", "", "All");
            return View();
        }
        public ActionResult ReportBookStock()
        {
            SqlParameter[] prm1 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.CategoryList = Utility.GetDropDownList("SP_LibBookCategory", "CategoryID", "CategoryName", prm1, "", "", "All");
            return View();
        }
        public ActionResult ReportMemberWise()
        {
            SqlParameter[] prm1 = new SqlParameter[] {
                  new SqlParameter("Type", "Select"),
            };
            ViewBag.MemberList = Utility.GetDropDownList("SP_LibMember", "LibMemberID", "MemberName", prm1, "", "", "Select");
            return View();
        }
        public ActionResult viewLibReport(string ReportType, string CategoryID, string LibMemberID, string Status, string FromDate, string ToDate)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("ReportType", ReportType),
                    new SqlParameter("CategoryID", CategoryID),
                    new SqlParameter("LibMemberID", LibMemberID),
                    new SqlParameter("Status", Status),
                    new SqlParameter("FromDate", FromDate),
                    new SqlParameter("ToDate", ToDate)
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibReport", prm1, CommandType.StoredProcedure);
                List<IssueBook> list = Utility.ConvertDataTableToClassObjectList<IssueBook>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewLibReportBookStock(string ReportType, string CategoryID)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("ReportType", ReportType),
                    new SqlParameter("CategoryID", CategoryID),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibReport", prm1, CommandType.StoredProcedure);
                List<BookStockReport> list = Utility.ConvertDataTableToClassObjectList<BookStockReport>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewLibReportCategorySummary()
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("ReportType", "CategorySummary"),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibReport", prm1, CommandType.StoredProcedure);
                List<CategoryWiseReport> list = Utility.ConvertDataTableToClassObjectList<CategoryWiseReport>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewLibReportMemberWise(string LibMemberID)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("ReportType", "MemberWise"),
                    new SqlParameter("LibMemberID", LibMemberID),
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibReport", prm1, CommandType.StoredProcedure);
                List<IssueBook> list = Utility.ConvertDataTableToClassObjectList<IssueBook>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Setting
        public ActionResult LibrarySetting()
        {
            return View();
        }
        public ActionResult saveLibSetting(string IssueDays, string FinePerDay)
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Save"),
                    new SqlParameter("IssueDays", IssueDays),
                    new SqlParameter("FinePerDay", FinePerDay)
                };
                string Output = Convert.ToString(new SQLHelper().ExecuteScalar("SP_LibSetting", prm1, CommandType.StoredProcedure));
                return Json(Output, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult viewLibSetting()
        {
            try
            {
                SqlParameter[] prm1 = new SqlParameter[] {
                    new SqlParameter("Type", "Select")
                };
                DataTable dt = new SQLHelper().ExecuteDataTable("SP_LibSetting", prm1, CommandType.StoredProcedure);
                List<LibrarySetting> list = Utility.ConvertDataTableToClassObjectList<LibrarySetting>(dt);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
    }
}