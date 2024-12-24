USE [master]
GO
/****** Object:  Database [Mapbox]    Script Date: 12/24/2024 8:39:24 PM ******/
CREATE DATABASE [Mapbox]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'mapbox', FILENAME = N'/var/opt/mssql/data/mapbox.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'mapbox_log', FILENAME = N'/var/opt/mssql/data/mapbox_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Mapbox] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Mapbox].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Mapbox] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Mapbox] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Mapbox] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Mapbox] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Mapbox] SET ARITHABORT OFF 
GO
ALTER DATABASE [Mapbox] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Mapbox] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Mapbox] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Mapbox] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Mapbox] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Mapbox] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Mapbox] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Mapbox] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Mapbox] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Mapbox] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Mapbox] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Mapbox] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Mapbox] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Mapbox] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Mapbox] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Mapbox] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Mapbox] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Mapbox] SET RECOVERY FULL 
GO
ALTER DATABASE [Mapbox] SET  MULTI_USER 
GO
ALTER DATABASE [Mapbox] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Mapbox] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Mapbox] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Mapbox] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Mapbox] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Mapbox] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Mapbox', N'ON'
GO
ALTER DATABASE [Mapbox] SET QUERY_STORE = ON
GO
ALTER DATABASE [Mapbox] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Mapbox]
GO
/****** Object:  Table [dbo].[Polygons]    Script Date: 12/24/2024 8:39:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Polygons](
	[ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/24/2024 8:39:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [uniqueidentifier] NULL,
	[UserName] [nvarchar](100) NULL,
	[Password] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vertices]    Script Date: 12/24/2024 8:39:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vertices](
	[ID] [uniqueidentifier] NOT NULL,
	[PolygonID] [uniqueidentifier] NOT NULL,
	[Longitude] [decimal](18, 6) NOT NULL,
	[Latitude] [decimal](18, 6) NOT NULL,
	[VertexIndex] [int] NOT NULL
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [Mapbox] SET  READ_WRITE 
GO